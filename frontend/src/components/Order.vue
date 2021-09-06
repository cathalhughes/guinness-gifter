<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="orders"
                :items-per-page="5"
                class="elevation-1"
        />
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    export default {
        name: "Order",
        methods: {
            ...mapActions('orders', ['getOrders'])

        },
        data: () => ({
            headers: [
                { text: 'order', value: '_id' },
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Vegetarian', value: 'isVegetarian' },
                { text: 'Cuisine Type', value: 'cuisine' },
                { text: 'Price', value: 'price' },
                { text: 'Label', value: 'label' },
            ]
        }),
        computed: {
            ...mapState('orders', ['orders']),
        },
        created() {
            this.getOrders({status: "done"})
        }
    }
</script>

<style scoped>

</style>
