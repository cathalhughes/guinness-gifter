import Login from '@/views/Login'
import Vuetify from "vuetify";
import {mount} from "@vue/test-utils";
import Vue from "vue";

Vue.use(Vuetify)


const push = jest.fn();
const $router = {
    push: push
}

describe('Login Page', () => {
    let wrapper, vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(Login, {
            vuetify,
            mocks: {
                $router
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })


    it('should be a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should not log in when fields not filled in ', () => {
        const loginButton = wrapper.find('#login')
        loginButton.trigger('click')
        expect(push).toBeCalledTimes(0)
    })

    it('should log in when fields are filled in ', () => {
        const email = wrapper.find('#email')
        email.setValue('test@mail.com')
        const password = wrapper.find('#password')
        password.setValue('some value')

        const loginButton = wrapper.find('#login')
        loginButton.trigger('click')
        expect(push).toBeCalledTimes(1)
    })
})
