<template>
    <div />
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        name: 'callback',
        methods: {
            ...mapActions('restaurant', ['getOrCreateRestaurant'])
        },
        mounted() {
            this.$auth.handleAuthentication().then(async () => {
                await this.getOrCreateRestaurant({auth0Id: this.$auth.user.sub, email: this.$auth.user.email})
                this.$router.push({ path: '/' })
            })
        }
    }
</script>
