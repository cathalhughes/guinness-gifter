import axios from 'axios';
import to from 'await-to-js';

const state = {
    reviews: [],
    restaurantId: null,
    restaurantDetails: null,
}

const mutations = {
    setReviews (state, payload) {
        state.reviews = payload
    },

    setRestaurant(state, restaurantId) {
        state.restaurantId = restaurantId;
    },

    setRestaurantDetails(state, restaurant) {
        state.restaurantDetails = restaurant;
    }
}

const getters = {

}

const actions = {

    async getReviews ({commit, rootState}) {
        const restaurantId = rootState.restaurant.restaurantId;
        const response = await axios.get(`/restaurant/${restaurantId}/reviews`)
        commit('setReviews', response)
    },

    async getOrCreateRestaurant({ commit }, { auth0Id, email }) {
        const params = {
            email
        }
        const [err, response] = await to(axios.get(`/restaurant/${auth0Id}`, { params }))
        if(err) throw new Error(err.message)
        commit('setRestaurant', response._id)
        commit('setRestaurantDetails', response)
        return response
    },

    async updateRestaurant({ state, commit }, accountDetails) {
        const [err, response] = await to(axios.patch(`/restaurant/${state.restaurantId}`, accountDetails))
        if(err) throw new Error(err.message)
        commit('setRestaurantDetails', accountDetails)
        console.log(response)
        return response
    },

    async createRestaurant({ commit }, auth0Id) {
        const [err, response] = await to(axios.post('/restaurant', { auth0Id }));
        if(err) throw new Error(err.message)
        commit('setRestaurant', response._id)
    },

    async getStripeSetUpLink({ state }) {
        const [err, response] = await to(axios.get(`/payment/${state.restaurantId}/setup`));
        if(err) throw new Error(err.message)
        return response.url
    },

    async setUpBankAccount({ state }, token) {
        const params = {
            token
        }
        const [err, response] = await to(axios.get(`/payment/${state.restaurantId}/setupBankAccount`, { params }));
        if(err) throw new Error(err.message)
        return response
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
