import Index from '@/views/Index'
import AppBar from '@/components/navigation/AppBar'
import NavigationDrawer from '@/components/navigation/NavigationDrawer'
import View from '@/views/View'
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)

const mutations = {
    setDrawer: jest.fn()
}
const getters = {
    getDrawer: jest.fn()
}
const store = new Vuex.Store({
    state: { drawer: true },
    mutations,
    getters
})


const router = new VueRouter({ mode: 'history' })

describe('Index Page', () => {
    let wrapper, vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = shallowMount(Index, {
            vuetify,
            router,
            store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('should render AppBar', () => {
        expect(wrapper.contains(AppBar)).toBeTruthy()
    })

    it('should render NavigationDrawer', () => {
        expect(wrapper.contains(NavigationDrawer)).toBeTruthy()
    })

    it('should render View', () => {
        expect(wrapper.contains(View)).toBeTruthy()
    })

})
