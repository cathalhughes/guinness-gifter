import router from "../router/index";
import isAfter from "date-fns/is_after";
import subtractMinutes from "date-fns/sub_minutes";
import addSeconds from "date-fns/add_seconds";
import differenceInMilliSeconds from "date-fns/difference_in_milliseconds";
import auth0 from 'auth0-js'
import {domain , clientID, audience } from "../../auth_config"
import Vue from 'vue'

let webAuth = new auth0.WebAuth({
    domain,
    clientID,
    redirectUri: 'http://localhost:8080/callback',
    audience,
    responseType: 'token id_token',
    scope: 'openid profile'
})

function initSession() {
    return new Promise(() => {
        let tokenExpiryDate = localStorage.getItem('token_expiry');
        if (!tokenExpiryDate) {
            console.log("No token expiry date. user probably never logged in");
            return router.push("/login");
        }

        let tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10);//If the token has expired or will expire in the next 30 minutes
        const now = new Date();
        if (isAfter(now, tenMinutesBeforeExpiry)) { //If the token has expired or will expire in the next 10 minutes
            console.log("Token expired/will expire in the next 1 minutes");
            return router.push("/login");
        }

        console.log("Token Ok. Expiring at " + tokenExpiryDate);
        setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
    });
}

function refreshTokens() {
    webAuth.checkSession({}, function (err, authResult) {
        if (err) {
            router.push("/login");
        }

        Vue.prototype.$auth.expiresAt = authResult.expiresIn
        Vue.prototype.$auth.accessToken = authResult.accessToken
        Vue.prototype.$auth.token = authResult.idToken
        Vue.prototype.$auth.user = authResult.idTokenPayload

        const tokenExpiryDate = addSeconds(new Date(), authResult.expiresIn);
        const tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10);
        const now = new Date();
        setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
    });
}

export { initSession };