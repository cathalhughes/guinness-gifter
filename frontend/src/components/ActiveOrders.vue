<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="orders"
                class="elevation-1"
        >
        <template v-slot:item="props">
            <tr>
            <td>{{props.item.status}}</td>
            <td>{{props.item.total}}</td>
            <td>{{props.item.location}}</td>
            <td><v-btn @click="updateOrder(props.item._id, props.item.status)">Update</v-btn></td>
            </tr>
        </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex";
    import { EventSourcePolyfill } from 'event-source-polyfill';
    export default {
        name: "Order",
        methods: {
            ...mapActions('orders', ['getOrders', 'updateOrderStatus']),
            updateOrder(orderId, status) {
                if(status === "pending") this.updateOrderStatus({orderId, status: "active"})
                else this.updateOrderStatus({orderId, status: "done"})
            },
            getEvents() {
                // console.log(this.$auth.accessToken)
                const EventSource = EventSourcePolyfill;
                const source = new EventSource('http://localhost:3003/api/events/', { headers: { 'Authorization': `Bearer ${this.$auth.accessToken}` }});
                source.addEventListener(`newOrderReceived-${this.restaurantId}`, () => { 
                    this.getOrders({restaurantId: this.restaurantId, status: { $in: ["pending", "active"]}}) })
            }
        },
        data: () => ({
            headers: [
                { text: 'Status', value: 'status' },
                { text: 'Total', value: 'total' },
                { text: 'Collection/Table', value: 'location' },
                { text: 'Update'}
            ]
        }),
        computed: {
            ...mapState('orders', ['orders']),
            ...mapState('restaurant', ['restaurantId']),
            ...mapGetters('orders', ['getFilteredOrders']),

            pendingOrders() {
                return this.getFilteredOrders({status: "pending"})
            },

            activeOrders() {
                return this.getFilteredOrders({status: "active"})
            }
        },
        async created() {
            await this.getOrders({status: { $in: ["pending", "active"]}})
            this.getEvents()
        }
    }
</script>

<style scoped>

</style>
