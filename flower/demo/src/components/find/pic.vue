<template>
  <div id="image">
    <van-image  width="100%" src="../../../static/image/test1.jpg" />
    <div class="dIcon"  @click="download">
      <van-icon name="down" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Image
  } from 'vant';

  Vue.use(Image);

  export default{
    methods:{
      download(){
        console.log('下载')
      }
    }
  }

</script>

<style>
  #image{
    width: 100%;
    /* height: 30rem; */
    /* background-color: #42B983; */
    text-align: center;
    /* position: relative; */
  }
  .dIcon{
    background-color: white;
    width: 3rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    opacity: .5;
    position: fixed;
    right: 8%;
    top: 88%;
    font-size: 1.5rem;
    color: black;
  }
</style>
