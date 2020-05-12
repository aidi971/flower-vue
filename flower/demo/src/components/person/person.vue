<template>
  <div>
      <router-link :to="'install'">
      <van-nav-bar>
        <van-icon name="more-o" slot="right" size="1.5rem" />
      </van-nav-bar>
      </router-link>
    <van-row>
      <van-col span="8" class="colLeft">
        <van-image round width="5.25rem" height="5.25rem" fit="cover" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </van-col>
      <van-col span="16" class="colRight">
        <p class="userName">{{info}}</p>
        <div class="detailed">
          <p>{{this.userInfo.username}}</p>
          <!-- <van-button to="personal" color="#cca27c" plain type="primary">个人资料</van-button> -->
        </div>
      </van-col>
    </van-row>
    <div class="midInfo">
      <div class="information">
        <van-row>
          <van-col span="12" class="colInfo" @click="gomyorder">
            <van-icon name="other-pay" size="2rem" />
            <p>订单</p>
          </van-col>
          <van-col span="12" class="colInfo" @click="gomessage">
            <van-icon name="chat-o" size="2rem" />
            <p>消息</p>
          </van-col>
        </van-row>
      </div>
      <div class="information">
        <van-row>
          <van-col span="12" class="colInfo" @click="goinvite">
            <van-icon name="gold-coin-o" size="2rem" />
            <p>金币充值</p>
          </van-col>
          <van-col span="12" class="colInfo" @click="gocooperation">
            <van-icon name="friends-o" size="2rem" />
            <p>商务合作</p>
          </van-col>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="edition">
      <span>{{edition}}</span>
    </div>
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
    Col,
    Row
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Col);
  Vue.use(Row);

  export default {
    name: 'person',
    components: {
      navbottom
    },
    data() {
      return {
        edition: '如有问题，请联系管理员。电话：123456',
        name: 'user',
        info: ''
      }
    },
    methods: {
      ...mapMutations(['logout']),
      gomessage() {
        this.$router.push('/message')
      },
      gocooperation() {
        this.$router.push('/cooperation')
      },
      gomyorder() {
        this.$router.push('/myorder')
      },
      personal() {
        console.log('个人资料')
        this.$router.push('/personal')
      },
      goinvite() {
        this.$router.push('/invite')
      },
    },
    created() {
      // 用户信息
      console.log(this.userInfo)
    },
    computed:
      mapState({
        userInfo:state=>state.user,

      }),


  }
</script>

<style>

  .van-nav-bar .van-icon {
    color: black;
  }

  .colLeft {
    /* background-color: #42B983; */
    text-align: center;
  }

  .colRight {
    /* background-color: pink; */
  }

  .detailed p{
    padding: 1rem 3rem;
    color: gray;
    font-size: 1.15rem;
    /* background-color: antiquewhite; */
  }

  .userName {
    padding: 0 0.625rem;
    font-size: 1.125rem;
    font-weight: bold;
  }

  .information {
    width: 90%;
    /* background-color: #87CEEB; */
    margin: 3rem auto;
    box-shadow: 0 0 0.625rem lightgray;
    text-align: center;
  }

  .information p {
    margin: 0;
    padding: 0;
  }

  .colInfo {
    margin: 0.9375rem 0;
  }

  .midInfo {
    margin-top: 4rem;
    /* background-color: #42B983; */
  }

  .edition {
    text-align: center;
    color: darkgray;
  }
</style>
