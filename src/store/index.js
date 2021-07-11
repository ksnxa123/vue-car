import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import account from "./modules/account";
import location from "./modules/locations";
import config from "./modules/config";
import common from "./modules/common";
export default new Vuex.Store({
  modules: {
    account,
    location,
    app,
    config,
    common
  }
});
