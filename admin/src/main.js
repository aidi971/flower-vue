import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
// import store from './vuex/store'
import Vuex from 'vuex'
import store from './vuex/index'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios';
import VueAxios from 'vue-axios'
// import store from './views/store/index.js'



Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(mavonEditor)

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
	routes
})

router.beforeEach((to,from,next)=>{
  if (to.meta.requireAuth){
    if (store.state.currentUser !==null&& store.state.currentUser){
      next()
    }
    else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }
  else{
    next()
  }
})
// axios.interceptors.response.use(
//     response => {
// 	  if(response.data.code === 500) {
//         // if (response.data.msg === '请先登录') {
//           router.push({
//             path: '/login',
//             query: {redirect: router.history.current.fullPath}
//           })
//           //如果需要可以在这里将 vuex 里的 user 改为空对象
//         // }
//       //显示错误信息
//       return Promise.reject(response.data)
//     }

//     if(response.data.code === 200){
//       return response;
//     }
// }, error => {
//     //显示错误信息
//     return Promise.reject(error.response.data)
// });



new Vue({
	//el: '#app',
	//template: '<App/>',
	router,
	store,
	//components: { App }
	render: h => h(App)
}).$mount('#app')
