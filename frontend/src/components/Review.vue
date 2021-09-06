<script>
    export default {
        name: "Review",
        props: {
            review: {
                type: String,
                default: null
            },
            rating: {
                type: Number,
                required: true
            },
            dateCreated: {
                type: String,
                default: null
            }
        }
    }
</script>

<template>
  <v-card>
    <v-card-text>
      {{review}}
      <div class="text-center mt-12">
        <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
                readonly
        ></v-rating>
      </div>
    </v-card-text>
    <v-card-text>Date Created: {{dateCreated}}</v-card-text>
  </v-card>
</template>

<style scoped>

</style>
