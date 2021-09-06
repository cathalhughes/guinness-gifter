import Vue from 'vue'
import VueRouter from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'

import Footer from '@/components/navigation/Footer'
import footerLinks from '@/constants/footer'
import Vuetify from "vuetify";

Vue.use(Vuetify)
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)

describe('Footer', () => {
  let wrapper, vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Footer, {
      localVue,
      vuetify,
      router,
      propsData: {
        footerLinks: footerLinks
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render all footer links correctly', () => {
    for (let i = 0; i < footerLinks.length; i++) {
      const link = wrapper.find(`#footerLink-${i}`)
      expect(link.text()).toBe(footerLinks[i].label)
    }
  })
})
