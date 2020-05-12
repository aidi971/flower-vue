<template>
  <!-- 底部导航栏 -->
  <van-tabbar route active-color="#cca27c" inactive-color="#757575">
    <van-tabbar-item replace to="/find" icon="browsing-history" active>
      发现
    </van-tabbar-item>
    <van-tabbar-item replace to="/knowledge" icon="column">
      知识
    </van-tabbar-item>
    <van-tabbar-item replace to="/activity" icon="eye">
      活动
    </van-tabbar-item>
    <van-tabbar-item replace to="/person" icon="manager">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';

  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  export default {
    data () {
      return {
        name:'navbottom',
        // active: 0,
        //       icon: {
        //         active: 'https://img.yzcdn.cn/vant/user-active.png',
        //         inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
        //       }
      }
    }
  }
</script>

<style>
</style>
