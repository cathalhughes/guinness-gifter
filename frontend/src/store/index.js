// https://github.com/chrisvfritz/vue-enterprise-boilerplate/tree/master/src/state
// https://vuex.vuejs.org/guide/

import Vue from 'vue'
import Vuex from 'vuex'

import navigationStore from './modules/navigation'
import menuStore from './modules/menu'
import orderStore from './modules/orders'
import restaurantStore from "./modules/restaurant";
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'store',
  storage: window.localStorage,
  reducer: state => ({
    context: state.context,
    restaurant: {
      restaurantId: state.restaurant.restaurantId,
    },
  }),
});

const store = new Vuex.Store({
  modules: {
    navigation: navigationStore,
    menu: menuStore,
    orders: orderStore,
    restaurant: restaurantStore
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocalStorage.plugin]
})

export default store
