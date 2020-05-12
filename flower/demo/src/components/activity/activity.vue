<template>
  <div style="padding-bottom: 4.25rem">
    <van-nav-bar title="线下活动"></van-nav-bar>
    <div class="roundPic">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image lazy-load fit="cover" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 线下课程 -->
    <span class="title0">线下课程</span>
    <van-grid :gutter="5" :border="true" :column-num="2">
      <van-grid-item v-for="(item,index) in lessonList" :key="index" @click="test(item)">
        <van-image width="8rem" height="8rem" fit="cover" :src="item.pic" />
        <div class="headWords">{{item.name}}</div>
        <!-- <div class="timeWords">讲师：{{item.teacher}}</div> -->
        <div class="timeWords">{{item.time}}</div>
        <div class="priceWords">￥{{item.price}} / 人</div>
      </van-grid-item>
    </van-grid>

    <navbottom></navbottom>
  </div>

</template>

<script>
  import navbottom from '../../common/navbottom.vue'
  import Vue from 'vue';
  import {
    mapMutations,mapState
  } from 'vuex';
  import {
    NavBar,
    Image,
    Swipe,
    SwipeItem,
    Grid,
    GridItem
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Image);
  Vue.use(Grid);
  Vue.use(GridItem);

  export default {
    name: 'activity',
    components: {
      navbottom
    },
    data() {
      return {
        current: 0,
        lesson:'',
        form:{
          id:'',
          description:'',
          name:'',
          num:'',
          price:'',
          content_html:'',
          content_md:''
        },
        lessonList:[],
        images: [
          require('../../../static/image/test1.jpg'),
          require('../../../static/image/test2.jpg'),
          require('../../../static/image/test3.jpg')
        ],
        SwiperImg: [
          "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
          "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg",
          "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
          "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34729/14/3948/120618/5cbeee07Efbe17ec5/d57ddd4fbbbc09e0.jpg!cr_1125x549_0_72!q70.jpg.dpg"
        ],
        test1: [{
            pic: require('../../../static/image/test3.jpg'),
            head: 'PBL花店创业营111111111111111',
            teacher: '曹雪',
            time: '2019.11.04~11.15',
            place: '北京',
            price: '9800'
          },
          {
            pic: require('../../../static/image/test2.jpg'),
            head: '秋拾-专业花艺师班',
            teacher: '季丹',
            time: '每月开课',
            place: '成都',
            price: '4980'
          }
        ],
      }
    },
    methods: {
      getLesson(){
        this.axios.get("/findall/course/").then(response => {
          // console.log(response)
          if(response.status == 200){
            // Toast.success('登录成功');
            console.log(response.data)
            this.lessonList = response.data;
            // localStorage.setItem("lessonList",JSON.stringify(this.lessonList))
          }else{
            // Toast.fail('登录失败')
          }
        }).catch(err => {
          console.log(err)
        });
      },
      jump(index) {
        if (index == 0) {
          console.log(index)
          this.$router.push({
            name: 'order'
          })
        } else {
          console.log(index)
        }
      },
      test(item) {
        var _this = this
        // console.log(item.id);
        this.axios.post('/find/course/'+item.id.toString()).then(res=>{
          if(res.data.status===200){
            console.log(res.data.object)
          _this.$store.commit('getCourse',res.data.object)
          // console.log(res)
          this.$router.push('/order')
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      
    },
    mounted() {
    	this.getLesson();
      // this.getUsers();
    },
    computed:
      mapState({
        login:state=>state.currentUser
      }),
  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: darkgray;
  }
  .roundPic {
    padding: 0.625rem 0.625rem 1.625rem 0.625rem;
    border-radius: 0.625rem;
  }

  .roundPic img {
    border-radius: 0.625rem;
    width: 100%;
    height: 18.75rem;
  }

  .title0 {
    font-size: 1.125rem;
    font-weight: 600;
    display: block;
    margin: 0.625rem;
    padding-left: 0.625rem;
    padding-bottom: 0.625rem;
  }

  .headWords {
    text-align: left;
    margin: 0.625rem 0;
    width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
  }

  .timeWords {
    color: gray;
    font-size: 0.875rem;
  }

  .priceWords {
    color: #cca27c;
    margin-top: 0.625rem;
    font-size: 1rem;
  }
</style>
