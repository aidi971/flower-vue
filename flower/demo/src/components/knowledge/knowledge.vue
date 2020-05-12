<template>
  <div  style="padding-bottom: 4.25rem">
    <van-nav-bar title="线下活动"></van-nav-bar>
    <!-- <van-tabs animated swipeable> -->
      <!-- 模块一 -->
      <!-- <van-tab title="今日推荐"> -->
        <!-- 图片轮播 -->
        <div class="roundPic">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <van-image lazy-load fit="cover" :src="image"/>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 图片排列 -->
        <div :key="index" v-for="(item,index) in testList1" class="imgBorder">
          <span class="title">{{item.title}}</span>
          <van-grid square :gutter="3" :column-num="3" style="margin-top: 0.625rem;">
            <van-grid-item  :key="index" v-for="(item,index) in test2" @click="showPopup(item,index)">
              <van-image width="6rem" height="6rem" fit="cover" :src="item" />
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
      <!-- 模块2 -->
      <!-- <van-tab title="花束">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in bouquetList" @click="showPic(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item.image" />
          </van-grid-item>
        </van-grid>
      </van-tab> -->
      <!-- 模块3 -->
      <!-- <van-tab title="商业插花">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in bouquetList" @click="showPic(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item.image" />
          </van-grid-item>
        </van-grid>
      </van-tab> -->
      <!-- 模块4 -->
      <!-- <van-tab title="单品花材">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in bouquetList" @click="showPic(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item.image" />
          </van-grid-item>
        </van-grid>
      </van-tab> -->
      <!-- 模块5 -->
      <!-- <van-tab title="瓶花">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in bouquetList" @click="showPic(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item.image" />
          </van-grid-item>
        </van-grid>
      </van-tab> -->
      <!-- 模块6 -->
      <!-- <van-tab title="婚礼">
        <van-grid :gutter="5" :column-num="3" style="margin-top: 0.625rem;">
          <van-grid-item :key="index" v-for="(item,index) in bouquetList" @click="showPic(item,index)">
            <van-image width="100%" height="100%" fit="cover" :src="item.image" />
          </van-grid-item>
        </van-grid>
      </van-tab> -->
    <!-- </van-tabs> -->

    <navbottom></navbottom>
  </div>

</template>

<script>
  import navbottom from '../../common/navbottom.vue';
  import Vue from 'vue';
  import axios from "axios";
  import {
    Swipe,
    SwipeItem,
    Lazyload,
    Tab,
    Tabs,
    Grid,
    GridItem,
    ImagePreview
  } from 'vant';

  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(Grid);
  Vue.use(GridItem);
  Vue.use(ImagePreview);

  export default {
    data() {
      return {
        bouquetList: [],
        recommend:[],
        number:0,
        imagesList:[],
        current: 0,
        images: [
          require('../../../static/image/test1.jpg'),
          require('../../../static/image/test2.jpg'),
          require('../../../static/image/test3.jpg')
        ],
        testList1: [
          {
            title: '有些花束很漂亮',
          },
          {
            title: '奇怪的花草',
          }
        ],
        test2:[
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061329.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061328.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061327.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061326.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061325.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061324.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061323.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061321.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061320.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061319.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061316.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061318.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061317.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061315.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061312.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061314.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_2020051005061311.jpg',
           'http://eddiefivelive.info:8833/images/2020/05/10/_202005100506138.jpg',
        ]
      }
    },
    methods: {
      onChange(index) {
        this.current = index;
      },
      getData() {
        //壁纸类 接口
        // axios.get('./static/knowledge_bouquet.json').then(response => {
        //   let _data = response.data.bouquet
        //   // console.log(_data)
        //   this.bouquetList = _data;
        // }).catch(err => {
        //   console.log(err)
        // });
        //第一页接口
        // axios.get('./static/knowledge_recommend.json').then(response => {
        //   let _data = response.data.recommend;
        //   // console.log(_data);
        //   this.recommend = _data;
        //   for(let i=0;i<_data.length;i++){
        //     let images = _data[i].image;
        //     this.imagesList = images;
        //   }
        // }).catch(err => {
        //   console.log(err)
        // });
      },
      showPopup(item,index) {
        // console.log(item)
        ImagePreview({
          images: [item,],
          closeable: true,
        });
        // this.$router.push('/pic')
      },
      showPic(item,index) {
        // console.log(item.image)
        ImagePreview({
          images: [item.image,],
          closeable: true,
        });
        // this.$router.push('/pic')
      }
    },
    mounted() {
      this.getData();
    },
    name: 'knowledge',
    components: {
      navbottom
    }
  }
</script>

<style>
  .roundPic {
    padding: 0.625rem 0.625rem 1.625rem 0.625rem;
    border-radius: 0.625rem;
  }

  .roundPic img {
    border-radius: 0.625rem;
    width: 100%;
    height: 18.75rem;
  }

  .imgBorder img {
    border-radius: 0.3125rem;
  }

  .imgBox {
    /* background-color: black; */
    text-align: center;
  }
  .imgCon{
    /* width: 80%; */
    width: 6.5rem;
    height: 9.5rem;
    margin: 0.3rem auto;
  }
  .arrangeImg{
    width: 6.5rem;
    height: 6.5rem;
    margin: 0.3rem auto;
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
    display: block;
    margin: 0.625rem;
    padding: 0.625rem 0;
  }

  .top {
    margin-top: 0.625rem;
  }

  .van-tabs__line {
    background-color: #cca27c;
  }
</style>
