// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';



Vue.prototype.$api ='http://192.168.1.130:9801';
Vue.prototype.$axios = axios;


Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
