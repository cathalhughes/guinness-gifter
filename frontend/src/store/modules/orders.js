 import axios from 'axios';
 import { filter, maxBy, get } from 'lodash'
 import to from 'await-to-js'

const state = {
    orders: [],
    aggregatedOrdersByRestaurant: {},
    aggregatedOrdersByItem: [],
    aggregatedOrdersByUser: [],
}

const mutations = {
    setOrders (state, payload) {
        state.orders = payload
    },

    setAggregatedOrdersByRestaurant(state, aggregations) {
        state.aggregatedOrdersByRestaurant = aggregations
    },

    setAggregatedOrdersByUser(state, aggregations) {
        state.aggregatedOrdersByUser = aggregations
    },

    setAggregatedOrdersByItem(state, aggregations) {
        state.aggregatedOrdersByItem = aggregations
    },
}

const getters = {
    getOrders: state => {
        return state.orders
    },

    getFilteredOrders: state => filterObj => {
        return filter(state.orders, filterObj)
    },

    getItemStats: state => {
        return [
            { stat: 'Item which appears most in orders', value: get(maxBy(state.aggregatedOrdersByItem, 'totalTimesInOrder'), 'name') },
            { stat: 'Item ordered most by quantity', value: get(maxBy(state.aggregatedOrdersByItem, 'totalTimesInOrderedQuantity'), 'name') },
            { stat: 'Item which has generated most money', value: get(maxBy(state.aggregatedOrdersByItem, 'totalMoneySpentOnItem'), 'name') },
        ]
    },

    getUserStats: state => {
        return [
            {stat: 'User who has the most orders', value: get(maxBy(state.aggregatedOrdersByUser, 'totalOrdersByUser'), '_id')},
            {stat: 'User who has spent the most', value: get(maxBy(state.aggregatedOrdersByUser, 'totalSpentByUser'), '_id')},
        ]
    },

    getRestaurantStats: state => {
        return [
            {stat: 'Total number of orders', value: get(state.aggregatedOrdersByRestaurant, 'totalNumberOfOrders')},
            {stat: 'Total for all orders',  value: get(state.aggregatedOrdersByRestaurant, 'totalForAllOrders')},
            {stat: 'Average total of orders', value: get(state.aggregatedOrdersByRestaurant, 'averageOfAllOrders')},
            {stat: 'Total Number of items ordered', value: get(state.aggregatedOrdersByRestaurant, 'totalNumberOfItemsOrdered')},
            {stat: 'Average number of items ordered', value: get(state.aggregatedOrdersByRestaurant, 'averageNumberOfItemsOrdered')},
        ]
    }
}

const actions = {

    async getOrders ({commit, rootState}, filter) {
        filter = {
            ...filter,
            restaurantId: rootState.restaurant.restaurantId
        }
        const params = {
            filter,
        }
        const response = await axios.get('/order/', { params })
        commit('setOrders', response)
    },

    async updateOrderStatus({ dispatch, rootState }, {orderId, status}) {
        const restaurantId = rootState.restaurant.restaurantId;
        await axios.patch(`/order/${orderId}`, { status })
        dispatch('getOrders', {restaurantId, status: { $in: ["pending", "active"]}})
    },

    async getAggregatedOrderByRestaurant({commit, rootState}) {
        const restaurantId = rootState.restaurant.restaurantId;
        const [err, response] = await to(axios.get(`/order/restaurant/${restaurantId}/aggregated`))
        if(err) console.err(err)
        commit('setAggregatedOrdersByRestaurant', response[0])
    },

    async getAggregatedOrderByUser({commit, rootState}) {
        const restaurantId = rootState.restaurant.restaurantId;
        const [err, response] = await to(axios.get(`/order/restaurant/${restaurantId}/aggregated/user`))
        if(err) console.err(err)
        commit('setAggregatedOrdersByUser', response)
    },

    async getAggregatedOrderByItem({commit, rootState}) {
        const restaurantId = rootState.restaurant.restaurantId;
        const [err, response] = await to(axios.get(`/order/restaurant/${restaurantId}/aggregated/item`))
        if(err) console.err(err)
        commit('setAggregatedOrdersByItem', response)
    },

    async getAggregations({dispatch}) {
        await Promise.all([dispatch('getAggregatedOrderByRestaurant'), dispatch('getAggregatedOrderByUser'), dispatch('getAggregatedOrderByItem')])
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
