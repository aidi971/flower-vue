<template>
  <div id="install">
    <van-nav-bar title="更多">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="关于花田小憩 V1.0.0" name="1">
        <van-image width="10rem" height="10rem" fit="contain" :src="itemList.image" />
        <p>{{itemList.content}}</p>
      </van-collapse-item>
      <van-collapse-item title="隐私政策" name="2">
        <div>{{itemList.privatePolicy}}</div>
      </van-collapse-item>
      <van-collapse-item title="用户协议" name="3">
        <div>{{itemList.userAgreement}}</div>
      </van-collapse-item>
      <van-collapse-item title="商业合作" name="4">
        <div>{{itemList.businessCooperation}}</div>
      </van-collapse-item>
    </van-collapse>
    <!-- 按钮 -->
    <van-button round type="primary" block @click="out">退出</van-button>
  </div>

</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import {
    mapMutations
  } from 'vuex';
  import {
    NavBar,
    Collapse,
    CollapseItem,
    Image
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Image);

  export default {
    name: 'install',
    data() {
      return {
        activeName: '1',
        itemList: []
      }
    },
    methods: {
       ...mapMutations(['logout']),
      onClickLeft() {
        this.$router.go(-1)
      },
      out(){
        var _this = this
          this.axios.get('/logout').then(response => {
              console.log(response)
              if (response.data.status === 200){
                _this.$store.commit('logout')
                _this.$router.replace('/login')
                
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      },
      getData() {
        axios.get('/static/install.json').then(response => {
          let _data = response.data
          console.log(_data)
          this.itemList = _data;
        }).catch(err => {
          console.log(err)
        });
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style>
  .van-button--block{
    width: 80%;
    margin: 6.25rem auto;
  }
  .van-button--primary{
    background-color: dimgrey;
    border: 1px solid dimgrey;
  }
  .van-nav-bar .van-icon{
    color: darkgray;
  }
</style>
