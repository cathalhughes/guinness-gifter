<template>
    <v-container class="account">
        <v-row>
            <v-col class="d-flex justify-center" cols="12">
                <v-btn color="primary" @click="navigateToStripeSetUp()">Set up payments</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-center" cols="12">
                <v-row>
                    <v-col cols="12">
                    <div id="iban-element">
                    <!-- A Stripe Element will be inserted here. -->
                    </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn color="primary" @click="createToken()">Submit account</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- Used to display form errors. -->
                    <div id="error-message" role="alert"></div>
                </v-row>
            </v-col>
        </v-row>
            <v-row>

                <v-col
                cols="12"
                >
                <v-card
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                    <div class="flex-grow-1">
                        <v-card-title
                        class="headline"
                        >
                            <v-text-field
                                label="Name"
                                single-line
                                solo
                                :value="accountDetails.name"
                                @blur="updateRestaurantDetails('name', $event)"
                            ></v-text-field>
                        </v-card-title>

                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="2">
                                    <v-select
                                    :items="vegetarianSelections"
                                    label="Vegetarian"
                                    solo
                                    :value="vegetarianText(accountDetails.isVegetarian)"
                                    @input="updateVegetarianStatus($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Cuisine"
                                        solo
                                        :value="accountDetails.cuisine"
                                        @blur="updateRestaurantDetails('cuisine', $event)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Label"
                                        solo
                                        :value="accountDetails.location"
                                        @blur="updateRestaurantDetails('location', $event)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    label="Image URL"
                                    solo
                                    :value="accountDetails.image"
                                    @blur="updateRestaurantDetails('image', $event)"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    </div>

                    <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                    >
                        <v-img :src="accountDetails.image"></v-img>
                    </v-avatar>
                    </div>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
            <v-col cols="11" />
            <v-col cols="1"><v-btn style="float: right" :disabled="!detailsUpdated" @click="save()" color="primary">Save</v-btn></v-col>
            </v-row>
        </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { cloneDeep, trim, isEqual, isNil, omit } from 'lodash';

export default {
    data() {
        return {
            iban: null,
            stripe: null,
            accountDetails: {},
            vegetarianSelections: ['Vegetarian', 'Not Vegetarian'],
        }
    },
    computed: {
        ...mapState('restaurant', ['restaurantDetails']),
        detailsUpdated() {
            return !isEqual(this.accountDetails, this.restaurantDetails)
        }
    },
    methods: {
        ...mapActions('restaurant', ['getStripeSetUpLink', 'setUpPayouts', 'setUpBankAccount']),
        ...mapActions('restaurant', ['getOrCreateRestaurant', 'updateRestaurant']),
        async navigateToStripeSetUp() {
            const formLink = await this.getStripeSetUpLink()
            window.location = formLink
        },
        async setupStripePayouts() {
            await this.setUpPayouts()
        },
        async createToken() {
            const sourceData = {
                currency: 'eur',
                account_holder_name: 'Test',
                account_holder_type: 'individual',
            };

            const result = await this.stripe.createToken(this.iban, sourceData)
            if (result.error) {
                var errorElement = document.getElementById('error-message');
                errorElement.textContent = result.error.message;
            } else {
                await this.setUpBankAccount(result.token.id)
            }
        },

        vegetarianText(isVegetarian) {
            if(isNil(isVegetarian)) return ''
            return isVegetarian ? 'Vegetarian' : 'Not Vegetarian'
        },

        updateRestaurantDetails(field, event) {
            this.$set(this.accountDetails, field, trim(event.target.value))   
        },

        updateVegetarianStatus(event) {
            const update = event === 'Vegetarian' ? true : false
            this.$set(this.accountDetails, 'isVegetarian', update)
        },

        async save() {
            this.accountDetails = omit(this.accountDetails, 'location')
            await this.updateRestaurant(this.accountDetails)
            this.accountDetails = cloneDeep(this.restaurantDetails)
        }
    },

    async created() {
        const restaurantDetails = await this.getOrCreateRestaurant({auth0Id: this.$auth.user.sub, email: this.$auth.user.email})
        this.accountDetails = cloneDeep(restaurantDetails); 
    },

    mounted() {
        this.stripe = window.Stripe('pk_test_0DYU1GynXrFGaouWABMCkA5c00JGZLaKwO')
        let elements = this.stripe.elements()
        var style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                color: "#32325d",
            }
        };

        var options = {
            style: style,
            supportedCountries: ['SEPA'],
            // If you know the country of the customer, you can optionally pass it to
            // the Element as placeholderCountry. The example IBAN that is being used
            // as placeholder reflects the IBAN format of that country.
            placeholderCountry: 'IE',
        }

        // Create an instance of the iban Element.
        this.iban = elements.create('iban', options);

        // Add an instance of the iban Element into the `iban-element` <div>.
        this.iban.mount('#iban-element');

        this.iban.on('change', function(event) {
            var displayError = document.getElementById('error-message');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }

}
</script>

<style scoped>

input,
.StripeElement {
  height: 40px;
  padding: 10px 12px;

  color: #32325d;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

input:focus,
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

</style>

<style lang="scss">

.account {
    .v-text-field__details {
        display: none;
    }

    .v-input__slot {
        margin-bottom: unset !important;
    }
}

</style>

