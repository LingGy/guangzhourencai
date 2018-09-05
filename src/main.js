// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'   //引入路由配置文件
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import {Select,Radio,Option,Button,Pagination,Loading,RadioGroup,DatePicker,Message,Checkbox,CheckboxGroup,Notification} from 'element-ui';
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
Vue.prototype.$notify = Notification;
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

/* eslint-disable no-new */
for(let key in vfilters){
  Vue.filter(key,vfilters[key]);
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('loginAccesstoken');
  if(!role && to.path !== '/login'){
    next('/login');
  }else{
      next();
    }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
