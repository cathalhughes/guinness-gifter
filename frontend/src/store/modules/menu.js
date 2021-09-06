import axios from 'axios';
import to from 'await-to-js';

const state = {
    menu: [],
}

const mutations = {
    setMenu (state, payload) {
        state.menu = payload
    }
}

const getters = {
    
}

const actions = {

    async getMenu ({commit, rootState}) {
        const restaurantId = rootState.restaurant.restaurantId
        const response = await axios.get(`/menu/${restaurantId}/items`)
        commit('setMenu', response)
    },

    async createMenu ({dispatch, rootState}, { menu }) {
        const restaurantId = rootState.restaurant.restaurantId
        const params = {items: menu, restaurantId}
        const [err] = await to(axios.post(`/menu`, params));
        if(err) console.error(err)
        await dispatch('getMenu', restaurantId)
    },

    async updateMenu ({dispatch, rootState}, { menu }) {
        const restaurantId = rootState.restaurant.restaurantId
        const params = {items: menu, restaurantId}
        const [err] = await to(axios.patch(`/menu/${restaurantId}`, params));
        if(err) console.error(err)
        await dispatch('getMenu', restaurantId)
    },

    async deleteItems(context, { deletions }) {
        const params = { deletions }
        const [err] = await to(axios.delete('/item', { params }))
        if(err) console.error(err)
    },

    async deleteMenu({rootState, commit}) {
        const params = { restaurantId: rootState.restaurant.restaurantId }
        const [err] = await to(axios.delete('/menu', { params }))
        if(err) console.error(err)
        commit('setMenu', [])
    }


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
