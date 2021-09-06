<template>
    <div class="analytics">
        <v-row>
            <v-col cols="4">
                <v-card>
                    <stats-card v-for="stat in getRestaurantStats" :key="stat.stat" :stat="stat.stat" :value="stat.value" /> 
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <stats-card v-for="stat in getUserStats" :key="stat.stat" :stat="stat.stat" :value="stat.value" /> 
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <stats-card v-for="stat in getItemStats" :key="stat.stat" :stat="stat.stat" :value="stat.value" /> 
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from "vuex";
import StatsCard from './StatsCard'

export default {
    components: {
        StatsCard,
    },
    methods: {
        ...mapActions('orders', ['getAggregations'])
        
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('orders', ['aggregatedOrdersByRestaurant', 'aggregatedOrdersByUser',  'aggregatedOrdersByItem']),
        ...mapGetters('orders', ['getItemStats', 'getUserStats', 'getRestaurantStats'])
        
    },
    async created() {
        await this.getAggregations();
    }
}
</script>

<style scoped lang="scss">

</style>

