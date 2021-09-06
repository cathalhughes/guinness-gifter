<template>
    <div class="menu-editor">
        <div class="d-flex justify-center" v-if="noMenu">
            <span class="icon-button" @click="addItemToMenu">Create a menu<v-icon color="primary">mdi-pencil</v-icon></span>
        </div>
            <v-container v-else>
            <v-row v-for="(item, index) in menuItems" :key="index">

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
                                :value="item.name"
                                @blur="updateMenuItem(index, 'name', $event)"
                            ></v-text-field>
                        </v-card-title>

                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="2">
                                    <v-select
                                    :items="vegetarianSelections"
                                    label="Vegetarian"
                                    solo
                                    :value="vegetarianText(item.isVegitarian)"
                                    @input="updateVegetarianStatus(index, $event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Cuisine"
                                        solo
                                        :value="item.cuisine"
                                        @blur="updateMenuItem(index, 'cuisine', $event)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Price"
                                        solo
                                        prepend-inner-icon="mdi-currency-eur"
                                        :value="item.price"
                                        type="number"
                                        @blur="updateMenuItem(index, 'price', $event)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Label"
                                        solo
                                        :value="item.label"
                                        @blur="updateMenuItem(index, 'label', $event)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                    label="Image URL"
                                    solo
                                    :value="item.image"
                                    @blur="updateMenuItem(index, 'image', $event)"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <div class="d-flex justify-end">
                                <div>
                                    <span @click="deleteMenuItem(index)" class="icon-button">Delete Item <v-icon color="primary">mdi-delete</v-icon></span>
                                </div>
                            </div>
                        </v-card-subtitle>
                    </div>

                    <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                    >
                        <v-img :src="item.image"></v-img>
                    </v-avatar>
                    </div>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
            <v-col cols="11"><span class="icon-button" @click="addItemToMenu">Add Item<v-icon class="pb-1 pl-2" color="primary">mdi-plus-circle</v-icon></span></v-col>
            <v-col cols="1"><v-btn style="float: right" :disabled="!menuUpdated" color="primary" @click="saveMenu()">{{ createOrSave }}</v-btn></v-col>
            </v-row>
            </v-container>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import {isEmpty, isEqual, cloneDeep, trim, get, size} from 'lodash';

    export default {
        methods: {
            ...mapActions('menu', ['getMenu', 'createMenu', 'updateMenu', 'deleteItems', 'deleteMenu']),
            addItemToMenu() {
                this.menuItems.push({name: null, cuisine: null, isVegitarian: null});
            },

            updateMenuItem(index, field, event) {
                this.$set(this.menuItems[index], field, trim(event.target.value))   
            },

            updateVegetarianStatus(index, event) {
                const update = event === 'Vegetarian' ? true : false
                this.$set(this.menuItems[index], 'isVegitarian', update)
            },

            vegetarianText(isVegetarian) {
                if(isVegetarian === null) return ''
                return isVegetarian ? 'Vegetarian' : 'Not Vegetarian'
            },

            deleteMenuItem(index) {
                if(get(this.menuItems[index], '_id', null)) this.deletions.push(this.menuItems[index]._id)
                this.menuItems.splice(index, 1)
            },

            async saveMenu() {
                // all items have been deleted from the menu so delete the menu
                if(isEmpty(this.menuItems)) {
                    await Promise.all([this.deleteMenu(), this.deleteItems({deletions: this.deletions})])
                    this.deletions = []
                    return;
                }
                if(this.isCreateMode) {
                    await this.createMenu({menu: this.menuItems})
                }
                else {
                    if(size(this.deletions)) {
                        await Promise.all([this.updateMenu({menu: this.menuItems}), this.deleteItems({deletions: this.deletions})])
                        this.deletions = []
                    } else {
                        await this.updateMenu({menu: this.menuItems})
                    }
                }
                this.menuItems = []
                this.menuItems.push(...this.menu)
            }
        },
        data() {
            return {
                menuItems: [],
                vegetarianSelections: ['Vegetarian', 'Not Vegetarian'],
                deletions: [],
            };
        },
        computed: {
            ...mapState('menu', ['menu']),

            noMenu () {
                return isEmpty(this.menu) && isEmpty(this.menuItems)
            },

            menuUpdated() {
                if(!isEmpty(this.deletions) && isEmpty(this.menuItems)) return true;
                return !isEqual(this.menu, this.menuItems) && !isEmpty(this.menuItems);
            },

            createOrSave() {
                return isEmpty(this.menu) ? 'Create' : 'Save'
            },

            isCreateMode() {
                return isEmpty(this.menu)
            }
        },
        async created() {
            await this.getMenu()
            this.menuItems = cloneDeep(this.menu)
        }
    }
</script>

<style scoped lang="scss">

.icon-button {
    cursor: pointer;
}

</style>

<style lang="scss">

.menu-editor {
    .v-text-field__details {
        display: none;
    }

    .v-input__slot {
        margin-bottom: unset !important;
    }
}

</style>

