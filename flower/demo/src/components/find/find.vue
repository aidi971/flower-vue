<template>
  <div style="padding-bottom: 4.25rem">
    <!-- 三大模块 -->
    <van-tabs animated swipeable>
      <!-- 模块：文章 -->
      <van-tab title="文章">
        <van-grid :gutter="0" :column-num="1" :border="false" center>
          <van-grid-item v-for="(item,index) in articleList" :key="index" @click="goArticle(item)">
            <van-image lazy-load width="100%" height="30rem" fit="cover" :src="item.pic" />
            <!-- 图上的文字 -->
            <div class="imgWords">
              <p class="tWords">
                {{item.name}}
              </p>
              <p class="pWords">
                {{item.abs}}
              </p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <!-- 模块：植物图鉴 -->
      <van-tab title="植物图鉴">
        <van-grid :gutter="10" :column-num="2" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in mapList" @click="goMap(index)">
            <div class="mapTitle">{{item.name}}</div>
            <van-image width="8rem" height="8rem" fit="cover" :src="item.pic" />
          </van-grid-item>
        </van-grid>
        </van-popup>
      </van-tab>

      <!-- 模块：壁纸 -->
      <van-tab title="壁纸">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in wallpaperList" @click="showPopup(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item" />
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>

    <!-- 底部导航栏 -->
    <navbottom></navbottom>
  </div>
</template>

<script>

  import Vue from 'vue';
  import axios from "axios";
  import moment from 'moment';
  import {
    mapMutations,mapState
  } from 'vuex';
  import {
    Search,
    Tab,
    Tabs,
    Lazyload,
    Image,
    Swipe,
    SwipeItem,
    Col,
    Row,
    Popup,
    NavBar,
    Divider,
    ImagePreview
  } from 'vant';
  import navbottom from '../../common/navbottom.vue';

  Vue.use(Search);
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(Lazyload);
  Vue.use(Image);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Popup);
  Vue.use(Divider);
  Vue.use(NavBar);
  Vue.use(ImagePreview)

  export default {
    name: 'find',
    components: {
      navbottom
    },
    data() {
      return {
        articleList: [],
        mapList: [],
        wallpaperList: [
          'http://eddiefivelive.info:8833/images/2020/05/09/test1.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test2.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test3.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test4.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test5.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test6.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test7.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test8.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test9.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test10.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test11.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test12.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test14.jpg',
          'http://eddiefivelive.info:8833/images/2020/05/09/test15.jpg',
        ],
        number:0,
        show:false,
      };
    },
    created() {

    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        //文章 接口
         this.axios.get("/article").then(response => {
         	// console.log(response.data)
          let _data = response.data;
          this.articleList = response.data
         }).catch(err => {
         	console.log(err)
         });
        //植物类型 接口
        this.axios.get('/findall/plant/').then(response => {
          let _data = response.data
          // console.log(response)
          this.mapList = _data;
        }).catch(err => {
          console.log(err)
        });
        //壁纸 接口
        // axios.get('static/find_wallpaper.json').then(response => {
        //   let _data = response.data.wallpaper
        //   // console.log(_data)
        //   this.wallpaperList = _data;
        // }).catch(err => {
        //   console.log(err)
        // });
      },
      goArticle(item) {
        // console.log(item)
        var _this = this;
        // const article = item;
        _this.$store.commit('getArticle',item)
        this.$router.push('/article')
      },
      goMap(index) {
        console.log('goMap')
        console.log(index)
        this.$router.push('/map')
      },
      showPopup(item,index) {
        console.log('show')
        ImagePreview({
          images: [item,],
          closeable: true,
        });
      },
      showPlant(index) {
        this.show = true;
        console.log(index)
        this.number = index;
        console.log(this.number)
        // this.getData();
        // console.log(this.flowerList)
        // for(let i=0;i<this.flowerList.length;i++){
          // this.idList.push(this.flowerList[i].id);
          // console.log(i)
          // if(i == index){
          //   this.show = true;
          // }
        // }
        // console.log(this.idList.index)

      },
    },
  }
</script>

<style>
  .van-swipe__indicators {
    width: 0;
  }
  .mapTitle {
    /* background-color: coral; */
    margin: 0.625rem auto;
    text-align: center;
  }
  .imgIn {
    position: relative;
    /* margin-right: 0.625rem; */
  }
  .imgWords {
    color: white;
    position: absolute;
    bottom: 4.5rem;
    left: 3rem;
    /* background-color: yellowgreen; */
    width: 80%;
  }
  .tWords {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.25rem;
    margin: 0;
  }
  .pWords {
    margin: 0.5rem 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .van-tabs__line {
    background-color: #cca27c;
  }
  .topContent {
    width: 86%;
    height: 85%;
  }
  .contentImg img {
    border-radius: 0.3125rem;
  }

  .contentTitle01 {
    text-align: center;
    font-size: 1rem;
  }

  .contentTitle02 {
    text-align: center;
    font-size: 1.125rem;
  }
  .smell{
    width: 90%;
    height: 3.125rem;
    margin: 0 auto;
    /* background-color: #42B983; */
  }
  .van-divider{
    border-color: #A9A9A9;
    width: 90%;
    margin: 1rem auto;
  }
  .smell01{
    margin: 0;
    text-align: center;
    font-size: 1rem;
  }
  .smell02{
    margin: 0.5rem 0;
    text-align: center;
    font-size: 0.875rem;
    color: gray;
  }
  .content01{
    /* width: 80%; */
    /* background-color: #87CEEB; */
    margin: 1rem ;
    font-size: 1rem;
    color: gray;
  }
  .contentBottom{
    margin: 15% 0 0.625rem 0;
    text-align: center;
    font-size: 0.875rem;
    color: gray;
  }
</style>
