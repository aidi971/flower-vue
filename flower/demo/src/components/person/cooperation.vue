<template>
  <div id="cooperation">
    <van-nav-bar title="官方合作专区">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <div class="img">
      <van-image round width="100%" src="../../../static/image/logo.jpg" />
    </div>
    <div class="conWords">
      <p class="titleW">— 商务合作 —</p>
      <p class="conGrey">请先发送品牌介绍至邮箱</p>
      <p class="conBlack">微信：flower123</p>
      <p class="conBlack">电话：010-12345678</p>
      <p class="conBlack">邮箱：flower123@xxx.com</p>
    </div>


  </div>

</template>

<script>
  import Vue from 'vue';
  import {
    NavBar,
    Image
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Image);

  export default {
    name: 'cooperation',
    data() {
      return {

      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style>
  #cooperation{
    background-color: #F8F9F8;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .van-nav-bar .van-icon {
    color: black;
  }
  .img{
    width: 7rem;
    height: 7rem;
    margin: 4rem auto;
    box-shadow: 0 0 0.3125rem #D3D3D3;
    border-radius: 0.625rem;
  }
  .conWords{
    text-align: center;
  }
  .titleW{
    color: #000000;
    font-weight: bold;
  }
  .conGrey{
    color: gray;
    margin-bottom: 2.5rem;
  }
  .conBlack{
    margin: 0.5rem;
  }
</style>
