<template>
  <div id="myorder">
    <van-nav-bar title="我的订单">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <!-- <van-tabs v-model="activeKey" animated swipeable> -->
    <!-- <van-tab title="全部"> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div v-for="(item,index) in myCourse">
        <van-card  num="1" :price="item.price" :desc="'课程时间:'+item.time" :title="item.name" :thumb="item.pic">
          <template #footer>
              <van-button size="small" @click="tips(index,item)">退款</van-button>
            </template>
        </van-card>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- </van-tab> -->
    <!-- <van-tab title="待付款" :badge ="ordernum">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab> -->
    <!-- <van-tab title="已完成">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="退款/售后">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab> -->
    <!-- </van-tabs> -->

  </div>

</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import {
    mapState
  } from 'vuex';
  import {
    NavBar,
    PullRefresh,
    Toast,
    List,
    Tab,
    Tabs,
    Card,
    Dialog
  } from 'vant';
  import moment from "moment";

  Vue.use(NavBar);
  Vue.use(PullRefresh);
  Vue.use(List);
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(Card)
  Vue.use(Dialog);

  export default {
    name: 'myorder',
    data() {
      return {
        activeKey: 0,
        ordernum: 1,
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        myCourse:[],
        myId:'',
      }
    },
    methods: {
      tips(index,item){
        Dialog.confirm({
          title: '退款申请',
          message: '确定取消该课程，退还金币？',
        })
          .then(() => {
            // on confirm
            console.log(item.id)
             const id = item.id;
             console.log(typeof id)
             console.log(typeof id.toString())
            const username = this.login.username
            this.axios.post('/cancel/course/'+id.toString()+'/'+username,{
              id:id,
              username:username
            }).then(res =>{
              console.log(res)
              if(res.data.staus === 200){
                this.onRefresh();
                this.getMy();
              }
            }).catch( err =>{
              console.log(err)
            })
          })
          .catch(() => {
            // on cancel
          });
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }

          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 20) {
            this.finished = true;
          }
        }, 1000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      getMy(){
        const name = this.login.username;
        this.axios.post("/find/buy/course/" + name, {
          username: name,
        }).then(response => {
          // console.log(response)
          // console.log(response.config.data)
          if (response.data.status == 200) {
            // Toast.success('登录成功');
            console.log(response.data)
            this.myCourse = response.data.object
            // _this.$store.commit('login',response.data.object)
            // _this.$router.push('person');
          } else {
            // Toast.fail('登录失败')
          }
        }).catch(err => {
          console.log(err)
        });
      }
    },
    created() {
      // console.log(this.login)
      const name = this.login.username;
      this.axios.post("/find/buy/course/" + name, {
        username: name,
      }).then(response => {
        // console.log(response)
        // console.log(response.config.data)
        if (response.data.status == 200) {
          // Toast.success('登录成功');
          console.log(response.data)
          this.myCourse = response.data.object
          // _this.$store.commit('login',response.data.object)
          // _this.$router.push('person');
        } else {
          // Toast.fail('登录失败')
        }
      }).catch(err => {
        console.log(err)
      });
    },
    computed: mapState({
      login: state => state.currentUser,
    }),
  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: black;
  }

  .message {
    padding: 0 1rem;
  }

  .van-tabs__line {
    background-color: #cca27c;
  }
  .van-dialog__confirm, .van-dialog__confirm:active{
    color: #cca27c;
  }
</style>
