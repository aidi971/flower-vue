<template>
  <div id="message">
    <van-nav-bar title="系统消息">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <van-cell title="植物花艺学习平台" :value="time" size="large" :label="message"/>
    <!-- <van-cell title="植物花艺学习平台" :value="message" size="large" :label="message"/> -->
  </div>

</template>

<script>
  import Vue from 'vue';
  import {
    NavBar,Panel, Cell, CellGroup
  } from 'vant';
  import moment from "moment";

  Vue.use(NavBar);
  Vue.use(Panel);
  Vue.use(Cell);
  Vue.use(CellGroup);

  export default{
    name:'message',
    data(){
      return{
        message:'注册成功。',
        time:''
        }
    },
    methods:{
      onClickLeft() {
        this.$router.push('person')
      },
    },
    created() {
      // 转换时间格式年月日时分秒
      // this.time = this.$route.query.name
      // console.log(this.time)
    },
  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: black;
  }
  .message{
    padding: 0 1rem;
  }
</style>
