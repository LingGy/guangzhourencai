// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router'   //引入路由配置文件
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';
import vfilters from './assets/js/vfilters';
import echarts from 'echarts';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import md5 from 'js-md5'
import qs from 'qs'

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;



Vue.use(ElementUI);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

/* eslint-disable no-new */
for(let key in vfilters){
  Vue.filter(key,vfilters[key]);
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
