<template>
    <div />
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "Register",
        methods: {
            ...mapActions('restaurant', ['createRestaurant']),
        },
        async mounted() {
            const auth0Id = decodeURI(this.$route.query.user_id)
            console.log(auth0Id)
            await this.createRestaurant(auth0Id)
            window.location=`https://impact-apps.eu.auth0.com/continue?state=${this.$route.query.state}`
        }
    }
</script>

<style scoped>

</style>
