import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Menu from '@/components/Menu'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

Vue.use(Vuetify)

const router = new VueRouter({ mode: 'history' })
const vuetify = new Vuetify()

const menu = [
    {
        "name": "Idli",
        "isVegetarian": true,
        "cuisine": "South Indian",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1534611354/dummy-products/food/idli.jpg",
        "price": 0.99,
        "label": "4 pieces",
        "rating": 4
    }
]

const actions = {
    getMenu: jest.fn()
}
const store = new Vuex.Store({
    state: { menuState: { menu: menu }, userStore: { restaurantId: '5e88ba0ad6aea7520cda166a' } },
    actions
})

describe.skip('Menu', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Menu, {
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


    it('should get Menu from state when component is created', async () => {
        expect(actions.getMenu).toBeCalled()
    })

    it('should populate table with menu items from state', async () => {
        const body = wrapper.find('tbody')
        const menuItems = body.findAll('tr')
        expect(menuItems.length).toBe(1)

        const columns = menuItems.at(0).findAll('td')
        expect(columns.length).toBe(5)

        expect(columns.at(0).text()).toBe(menu[0].name)
        expect(columns.at(1).text()).toBe(menu[0].isVegetarian.toString())
        expect(columns.at(2).text()).toBe(menu[0].cuisine)
        expect(columns.at(3).text()).toBe(menu[0].price.toString())
        expect(columns.at(4).text()).toBe(menu[0].label)
    })
})
