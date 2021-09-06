import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Order from '@/components/Order'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

Vue.use(Vuetify)

const router = new VueRouter({ mode: 'history' })
const vuetify = new Vuetify()
const actions = {
    getOrders: jest.fn()
}
const store = new Vuex.Store({
    state: { userStore: { restaurantId: '5e88ba0ad6aea7520cda166a' }, orderStore: { orders: [] } },
    actions
})

describe.skip('Order', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Order, {
            localVue,
            vuetify,
            router,
            store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('should be a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })


    it('should get orders from state when component is created', async () => {
        expect(actions.getOrders).toBeCalled()
    })
})
