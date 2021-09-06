import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import NavigationDrawer from '@/components/navigation/NavigationDrawer'

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

const sideNavLinks = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Account', icon: 'mdi-account' },
  { title: 'About', icon: 'mdi-help-box' },
]

describe('Navigation Drawer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NavigationDrawer, {
      localVue,
      vuetify,
      router,
      store,
      propsData: {
        navItems: sideNavLinks
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has valid number of drawer items', () => {
    expect(wrapper.props().navItems.length).toBe(sideNavLinks.length)
  })

  it('renders navigation drawer items', () => {
    for (let i = 0; i < sideNavLinks.length; i++) {
      const listItem = wrapper.find(`#drawerItem-${i}`)
      expect(listItem.text()).toBe(sideNavLinks[i].title)
    }
  })

  it('Should return to home route on click on logo', async () => {
    const logo = wrapper.find('[data-qa="logoLink"]')
    logo.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.path).toBe('/')
  })
})
