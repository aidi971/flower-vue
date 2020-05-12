<template>
  <div id="order" style="padding-bottom: 4.25rem">
    <van-nav-bar title="线下课程">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <div class="orderRound">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image lazy-load fit="cover" :src="image" width="100%" height="15rem" />
        </van-swipe-item>
      </van-swipe>
      <div class="headline">
        <h3>{{lessonInfo.name}}</h3>
        <p>{{lessonInfo.teacher}}</p>
        <p>￥{{lessonInfo.price}}</p>
      </div>
    </div>

    <div class="introduction">
      <van-cell icon="clock-o" title="活动时间: 每月开课" />
      <!-- <van-cell icon="location-o" :title="'地址: '+formList.name" /> -->
      <!-- <van-cell icon="manager-o" :title="'教师:'+lessonList.name" />s -->
    </div>
    <div class="detailsInfo">
      <h4>活动介绍</h4>
      <p>{{lessonInfo.description}}<!-- 将近一个月的0基础课程包含基础插花，现代自由式插花
        商业花艺 自然风花艺 ins风韩式花束 节日主题花束 创意花盒设计
        婚礼宴会、专业花店经验管理课程，选用新鲜多样的花材，
        将基础的鲜花知识与操作技法与设计快速且高效的衔接，并开设花店经营管理课，
        为学员的花艺事业奠定良好的基础。 -->
      </p>
      <!-- <p>
        适合人群：针对零基础无任何花艺经验，对花艺感兴趣，希望进入花艺行业、
        或有意向成立花艺工作室、花店，以及与花艺相关的设计与策划类公司等。
        同时面向希望系统学习花艺基础知识的行业初入人群。
      </p> -->
      <p>课程席位剩余：{{lessonInfo.num}}人</p>
    </div>
    <!-- <div class="detailsInfo">
      <h4>讲师介绍</h4>
      <van-row>
        <van-col span="8">
          <van-image width="5rem" height="5rem" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="16">
          <h4 style="margin-bottom: 1rem;margin-top: 0.3rem;">季丹</h4>
          <div class="van-ellipsis divBoder">
            2016年，花艺作品在德国州园艺设计展展出；2017年，获德国IHK巴符州优秀花艺师表彰
          </div>
        </van-col>
      </van-row>
      <p>秋拾花艺技术总监;德国FDF、 IHK认证花艺师，德国从事花艺学习工作七年。
        高级花艺讲师，8年花艺从业经验，擅长欧式架构花艺。平面设计师，室内设计师，
        央视财经频道嘉宾。2016年，花艺作品在德国州园艺设计展展出；2017年，获德国IHK巴符州优秀花艺师表彰。
        案例甲方:德国银行，奔驰，宝马，飞天珠宝。</p>
    </div> -->

    <div class="detailsInfo">
      <h4>课程介绍</h4>
      <div class="markdown-body" v-html="this.testData.contentMd" />
      <!-- 底部 -->
      <div class="footer">
        *版权归花田小憩所有*
      </div>
    </div>
    <!-- <button @click="jump">回到活动页面</button> -->
    <div class="sku-container">
      <van-sku v-model="showBase" :sku="testData.sku" :goods="testData.goods_info"
        :hide-stock="testData.hide_stock" :quota="testData.quota"
        reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :close-on-click-overlay="closeOnClickOverlay"
        :show-add-cart-btn="showAddCartBtn" :custom-sku-validator="customSkuValidator" @buy-clicked="onBuyClicked" />
    </div>
    <!-- <van-popup v-model="show" closeable position="bottom" :style="{ height: '60%' }">
      <van-password-input :focused="showKeyboard" @focus="showKeyboard = true" :value="value" close-button-text="完成"
        info="密码为 6 位数字"  />
    <van-number-keyboard
      theme="custom"
      :show="showKeyboard"
      close-button-text="完成"
      @blur="showKeyboard = false"
      @input="onInput"
      @delete="onDelete"
    />
    </van-popup> -->

    <!-- <orderbottom></orderbottom> -->
    <van-goods-action>
      <!-- <van-goods-action-icon icon="chat-o" text="咨询" @click="onClickIcon" /> -->
      <van-goods-action-button color="#3D3D3D" type="warning" text="报名参与" @click="showBase=true" />
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue';
  import marked from 'marked';
  import {
    mapState
  } from 'vuex';
  import orderbottom from '../../../common/orderbottom.vue';
  import {
    Swipe,
    SwipeItem,
    Lazyload,
    Panel,
    Cell,
    CellGroup,
    Card,
    Col,
    Row,
    Image,
    Sku,
    PasswordInput,
    NumberKeyboard,
    Popup,Toast
  } from 'vant';

  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  Vue.use(Panel);
  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(Card);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Image);
  Vue.use(Sku);
  Vue.use(PasswordInput);
  Vue.use(NumberKeyboard);
  Vue.use(Popup);
  Vue.use(Toast)

  export default {
    data() {
      return {
        contentMd:'',
        show: false,
        lessonList:[],
        value: '',
        showKeyboard: true,
        showBase: false,
        showCustom: false,
        showStepper: false,
        showSoldout: false,
        showAddCartBtn: false,
        closeOnClickOverlay: true,
        initialSku: {
          s1: '30349',
          s2: '1193',
          selectedNum: 1
        },
        testData:{
          id:'',
          contentMd:'',
          quota:1,//限购数量
          quota_used: 5, //已经购买过的数量，由于限购1，已取消
          goods_info:{
              title: '',
              picture: '../../../../static/image/test3.jpg'
          },
          hide_stock: false,// 是否隐藏剩余库存
          sku: {
            tree: [],
            list: [],
            price: '',
            stock_num: '', // 商品总库存
            none_sku: true, // 是否无规格商品
            collection_id: '',
          },
        },
        customSkuValidator: () => '请选择xxx!',
        msg: '每月开课',
        images: [
          require('../../../../static/image/test1.jpg'),
          require('../../../../static/image/test2.jpg'),
          require('../../../../static/image/test3.jpg')
        ]
      }
    },
    components: {
      orderbottom
    },
    methods: {
      onClickLeft() {
        this.$router.push('/activity')
      },
      jump() {
        this.$router.push('/activity')
      },
      goscore() {
        this.$router.push('/score')
      },
      onBuyClicked(data) {
        // console.log('buy:' + JSON.stringify(data));
        // this.show = true;
        // console.log(data)
        // this.lessonList = data
        // console.log(this.lessonList)
          const courseId = this.testData.sku.collection_id
            // console.log(this.login.username)
            const name = this.login.username
            this.axios.post('/buy/course/'+courseId.toString()+"/"+name,{
              username: name,
              price : this.testData.sku.price,
              coin : this.testData.sku.stock_num
            }).then(res=>{
              // console.log(res)
              if(res.data.status===200){
              const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '加载中...',
              });
              const timer = setInterval(() => {
                clearInterval(timer);
                // 手动清除 Toast
                Toast.clear();
                Toast.success('购买成功');
                console.log(res)
                // let plus = value+this.gold;
                // console.log(this.gold,plus)
                this.$router.push('/activity');
              }, 1500);
              }else if(res.data.status===500){
                Toast.fail('金币不足');
                this.$router.push('/order');
              }else if(res.data.status===501){
                Toast.fail('已购买过该课程');
                this.$router.push('/order');
              }
            }).catch(err=>{
              console.log(err)
            })
      },
      // onInput(key) {
      //   this.value = (this.value + key).slice(0, 6);
      //   if(this.value.length == 6){
      //     console.log(this.value)
      //     this.show=false;
      //     this.showBase=false;
      //     const courseId = this.testData.sku.collection_id
      //     console.log(this.login.username)
      //     const name = this.login.username
      //     this.axios.post('/buy/course/'+courseId.toString()+"/"+name,{
      //       username: name,
      //       price : this.testData.sku.price,
      //       account : this.testData.sku.stock_num
      //     }).then(res=>{
      //       // console.log(res)
      //       if(res.data.status===200){
      //       const toast = Toast.loading({
      //         duration: 0, // 持续展示 toast
      //         forbidClick: true,
      //         message: '加载中...',
      //       });
      //       const timer = setInterval(() => {
      //         clearInterval(timer);
      //         // 手动清除 Toast
      //         Toast.clear();
      //         Toast.success('购买成功');

      //         // let plus = value+this.gold;
      //         // console.log(this.gold,plus)
      //         this.$router.push('/myorder');
      //       }, 1500);
      //       }
      //     }).catch(err=>{
      //       console.log(err)
      //     })
      //   }
      // },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      },
    },
    created() {
      // 课程信息
      // this.lessonList = this.$route.query.lesson
      console.log(this.lessonInfo)
      this.testData.id = this.lessonInfo.id;
      this.testData.sku.collection_id = this.lessonInfo.id;
      this.testData.sku.stock_num = this.lessonInfo.num
      this.testData.sku.price = this.lessonInfo.price
      this.testData.goods_info.title = this.lessonInfo.name
      this.testData.contentMd = marked(this.lessonInfo.contentMd)
      // console.log(this.testData.id)
    },

    computed:
      mapState({
        lessonInfo:state=>state.lesson,
        login:state=>state.currentUser
      }),
  }
</script>

<style>
  #order {
    background-color: #F8F9F8;
  }

  .orderRound {
    position: relative;
  }

  .headline {
    position: absolute;
    bottom: 5%;
    left: 10%;
    color: white;
  }

  .headline h3 {
    margin: 0.625rem 0;
  }

  .headline p {
    margin: 0;
  }

  .introduction {
    /* background-color: #42B983; */
    width: 100%;
    /* height: 18.75rem; */
    margin-top: 0.3125rem;
  }

  .detailsInfo {
    background-color: white;
    /* width: 100%; */
    /* height: 18.75rem; */
    margin-top: 0.9375rem;
    padding: 0.625rem 1rem;
  }

  .detailsInfo p {
    color: #323232;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .divBoder {
    border: 0.0625rem solid black;
    padding: 0.4rem;
    font-size: 0.875rem;
  }
  .markdown-body {
    /* background-color: #008080; */
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
  }

  .markdown-body p {
    /* text-align: left; */
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    /* background-color: palegoldenrod; */
    margin: 0 auto;
    color: #323232;
    font-size: 1.125rem;
  }

  .markdown-body p img {
    width: 70%;
    height: 12.5rem;
    /* text-align: center; */
    margin: 1.25rem auto;
  }
  .footer {
    margin-top: 4rem;
    /* background-color: #87CEEB; */
    font-size: 0.75rem;
    width: 100%;
    /* height: 10rem; */
    color: #777777;
    text-align: center;
  }
</style>
