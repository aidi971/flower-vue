// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import store from './vuex/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(mavonEditor)
axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.currentUser !== null && store.state.currentUser) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
// router.beforeEach((to,from,next)=>{
//   if (to.path === '/login') {
//       next();
//     } else {
//       let token = localStorage.getItem('Authorization');

//       if (token === null || token === '') {
//         next('/login');
//       } else {
//         next();
//       }
//     }
// })
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
})
