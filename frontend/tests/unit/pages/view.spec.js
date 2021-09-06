import View from '@/views/View'
import Footer from '@/components/navigation/Footer'
import Vuetify from "vuetify";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import Vue from "vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({ mode: 'history' })

describe('View Page', () => {
    let wrapper, vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(View, {
            vuetify,
            router,
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('should render Footer', () => {
        expect(wrapper.contains(Footer)).toBeTruthy()
    })

})
