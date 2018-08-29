// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router'   //引入路由配置文件
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import {Select,Radio,Option,Button,Pagination,Loading,RadioGroup,DatePicker,Message,Checkbox,CheckboxGroup} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';
import vfilters from './assets/js/vfilters';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import md5 from 'js-md5'
import qs from 'qs'
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.prototype.$message = Message;
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

/* eslint-disable no-new */
for(let key in vfilters){
  Vue.filter(key,vfilters[key]);
}
new Vue({
  el: '#app',
  router,
  beforeCreate: function () {
    let vm = this;
    vm.$axios({
      method: 'post',
      async: false,
      url: window.$g_url.ApiUrl + '/entry',
      data: 'outerid=test&sign=e62f1206793e951d362910767ba2b548'
    })
      .then(function (res) {
        if (res.data.code == 0) {
          sessionStorage.setItem('loginInfo', res.data.result);
          sessionStorage.setItem('loginAccesstoken', res.data.result.accesstoken);
        } else {
          vm.$router.push('/error');
        }
      })
      .catch(function (err) {
        vm.$router.push('/error');
      });
  },
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    const loginAccesstoken = sessionStorage.getItem('loginAccesstoken');
    if (!loginAccesstoken) { // 判断当前的token是否存在
      next({
        path: '/error',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
