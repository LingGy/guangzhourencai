// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/common.css';
import vfilters from './assets/js/vfilters';
import echarts from 'echarts';


Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;


Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
for(let key in vfilters){
  Vue.filter(key,vfilters[key]);
}

new Vue({
  el: '#app',
  data:{
    Bus:new Vue()
  },
  components: { App },
  template: '<App/>'
})
