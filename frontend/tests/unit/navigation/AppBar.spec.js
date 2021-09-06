import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import AppBar from '@/components/navigation/AppBar'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

Vue.use(Vuetify)

const router = new VueRouter({ mode: 'history' })
const vuetify = new Vuetify()
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

describe('AppBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AppBar, {
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


  it('should set drawer state when hamburger button is click', async () => {
    const button = wrapper.find('#hamburger_button')
    button.trigger('click')

    await Vue.nextTick()

    expect(getters.getDrawer).toBeCalled()
    expect(mutations.setDrawer).toBeCalled()
  })
})
