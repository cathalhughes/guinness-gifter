<script>
    import Review from "../components/Review";
    import {mapActions, mapState} from "vuex";
    export default {
        name: "RestaurantDetailsPage",
        components: {Review},
        methods: {
            ...mapActions('restaurant', ['getReviews']),
        },
        computed: {
            ...mapState('restaurant', ['reviews']),
        },
        created() {
            this.getReviews()
        }
    }
</script>

<template>
  <v-container>
    <h1>Reviews</h1>
    <v-list>
      <template v-for="(item, index) in reviews">
        <Review
                :key="index"
                :review="item.review"
                :rating=item.rating
                :date-created="item.createdAt"
        />
      </template>
    </v-list>
  </v-container>

</template>


<style scoped>

</style>
