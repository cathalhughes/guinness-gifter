import auth0 from 'auth0-js'
import Vue from 'vue'
import addSeconds from "date-fns/add_seconds";
import {domain , clientID, audience } from "../../auth_config"
// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
    domain,
    clientID,
    redirectUri: 'http://localhost:8080/callback',
    audience,
    responseType: 'token id_token',
    scope: 'openid profile email'
})

let auth = new Vue({
    computed: {
        token: {
            get: function() {
                return localStorage.getItem('id_token')
            },
            set: function(id_token) {
                localStorage.setItem('id_token', id_token)
            }
        },
        accessToken: {
            get: function() {
                return localStorage.getItem('access_token')
            },
            set: function(accessToken) {
                localStorage.setItem('access_token', accessToken)
            }
        },
        expiresAt: {
            get: function() {
                return localStorage.getItem('expires_at')
            },
            set: function(expiresIn) {
                let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
                localStorage.setItem('expires_at', expiresAt)
                const tokensExpiry = addSeconds(new Date(), expiresIn);
                localStorage.setItem('token_expiry', tokensExpiry);
            }
        },
        user: {
            get: function() {
                return JSON.parse(localStorage.getItem('user'))
            },
            set: function(user) {
                localStorage.setItem('user', JSON.stringify(user))
            }
        }
    },
    methods: {
        login() {
            webAuth.authorize()
        },
        logout() {
            return new Promise(() => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('id_token')
                localStorage.removeItem('expires_at')
                localStorage.removeItem('user')
                localStorage.removeItem('token_expiry')
                webAuth.logout({
                    clientID,
                    returnTo: 'http://localhost:8080/login',
                })
            })
        },
        isAuthenticated() {
            return new Date().getTime() < this.expiresAt
        },
        handleAuthentication() {
            return new Promise((resolve, reject) => {
                webAuth.parseHash((err, authResult) => {

                    if (authResult && authResult.accessToken && authResult.idToken) {
                        this.expiresAt = authResult.expiresIn
                        this.accessToken = authResult.accessToken
                        this.token = authResult.idToken
                        this.user = authResult.idTokenPayload
                        resolve()

                    } else if (err) {
                        this.logout()
                        reject(err)
                    }

                })
            })
        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$auth = auth
    },
    webAuth,
}
