import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import location from './modules/locations'
import app from './modules/app'
export default new Vuex.Store({
  modules:{
    location,
    app
  }
});
