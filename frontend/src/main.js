import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store";
import router from "./router";
import Axios from './utils/axios';
import auth from './auth'

Vue.config.productionTip = false


Vue.use(auth)
Vue.use(Axios, { router, store });
new Vue({
  vuetify,
  store,
  router,
  // Axios,
  render: h => h(App)
}).$mount('#app')
