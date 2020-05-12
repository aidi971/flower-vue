import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage,
  //   reducer(data) {
  //     return {
  //       // 设置只储存state中的myData
  //       myData: data.myData
  //     }
  //   }
  // })],
  state: {
    currentUser: window.localStorage.getItem('user') === null ? " " : JSON.parse(window.localStorage.getItem("user")),
    // lessonList:localStorage.getItem('lessonList')?JSON.parse(localStorage.getItem("lessonList")):null,
    lesson: {
      lessonInfo: {}
    },
    total:{
      coin:''
    },
    article:{
      articleInfo:{}
    },
    user:{
      userInfo:''
    }


  },
  mutations: {
    login(state, user) {
      state.currentUser = user
      window.localStorage.setItem("user", JSON.stringify(user))
      // console.log(user)
    },
    logout(state) {
      state.currentUser = null
      window.localStorage.removeItem("user");
    },
    getCourse(state, lesson) {
      state.lesson = lesson
      // console.log(state.lesson)
    },
    getCoin(state, total) {
      state.total = total
      // console.log(state.total)
    },
    getArticle(state, article) {
      state.article = article
      // console.log(state.article)
    },
    articleCls(state){
      window.localStorage.removeItem(state.article.articleInfo)
    },
    getUser(state,user){
      state.user = user
    }
  }
})

export default store;
