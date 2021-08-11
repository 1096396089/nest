import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import AvueUeditor from "avue-plugin-ueditor";
Vue.use(AvueUeditor);

import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
Vue.use(Avue, { axios });

import "./plugins/element.js";

Vue.config.productionTip = false;

import http from './http'
Vue.prototype.$http=http
Vue.prototype.$axios = http;
window.axios = http;

Vue.mixin({
  methods:{
    getAuthHeader(){
      return{
        Authroization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
