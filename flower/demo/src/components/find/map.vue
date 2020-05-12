<template>
  <div>
    <van-nav-bar title="植物图鉴">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
      <van-grid :gutter="10" :column-num="2" style="margin-top: 0.625rem;">
        <van-grid-item :key="index" v-for="(item,index) in flowerList" @click="showPopup(index)">
            <van-image width="8rem" height="8rem" fit="cover" :src="item.pic" />
            <div class="head">{{item.name}}</div>
        </van-grid-item>
      </van-grid>

    <!-- 打开的窗口 -->
    <van-popup v-model="show" closeable close-icon="close" class="topContent">
      <div>
        <p class="contentTitle01">植物图鉴</p>
        <div class="contentImg">
          <van-image width="90%" height="13rem" fit="cover" :src="flowerList[this.number].pic" />
        </div>
        <p class="contentTitle02">{{flowerList[this.number].name}}</p>
        <div></div>
        <van-divider />
        <!-- <div class="smell">
          <van-row>
            <van-col span="8">
              <p class="smell01">{{flowerList[this.number].smell}}</p>
              <p class="smell02">气味浓度</p>
            </van-col>
            <van-col span="8">
              <p class="smell01">{{flowerList[this.number].humidity}}%</p>
              <p class="smell02">湿度要求</p>
            </van-col>
            <van-col span="8">
              <p class="smell01">{{flowerList[this.number].level}}</p>
              <p class="smell02">养护难度</p>
            </van-col>
          </van-row>
        </div> -->
        <van-divider />
        <p class="content01">{{flowerList[this.number].descpiprion}}</p>
        <p class="contentBottom">©花田小憩</p>
      </div>
    </van-popup>
  </div>

</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import {
    NavBar,
    Popup,
    Divider,
    Col, Row
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Popup);
  Vue.use(Divider);
  Vue.use(Col);
  Vue.use(Row);

  export default {
    data() {
      return {
        show: false,
        flowerList:[],
        idList:[],
        number:0,
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      showPopup(index) {
        this.show = true;
        console.log(index)
        this.number=index;
        console.log(this.number)
        // this.getData();
        // console.log(this.flowerList)
        // for(let i=0;i<this.flowerList.length;i++){
          // this.idList.push(this.flowerList[i].id);
          // console.log(i)
          // if(i == index){
          //   this.show = true;
          // }
        // }
        // console.log(this.idList.index)

      },
      getData(){
        //植物 接口
        this.axios.get('/findall/plant/').then(response => {
          let _data = response.data
          this.flowerList = _data;
          console.log(this.flowerList)
        }).catch(err => {
          console.log(err)
        });
      }
    },
    mounted() {
      this.getData();
    },

  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: darkgray;
  }
  .head {
    text-align: center;
    padding-top: 1rem;
    width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    color: #696969;
  }

  .topContent {
    width: 86%;
    height: 85%;
  }

  .contentImg {
    margin: 1.5rem auto;
    text-align: center;
    /* background-color: #87CEEB; */
  }

  .contentImg img {
    border-radius: 0.3125rem;
  }

  .contentTitle01 {
    text-align: center;
    font-size: 1rem;
  }

  .contentTitle02 {
    text-align: center;
    font-size: 1.125rem;
  }
  .smell{
    width: 90%;
    height: 3.125rem;
    margin: 0 auto;
    /* background-color: #42B983; */
  }
  .van-divider{
    border-color: #A9A9A9;
    width: 90%;
    margin: 1rem auto;
  }
  .smell01{
    margin: 0;
    text-align: center;
    font-size: 1rem;
  }
  .smell02{
    margin: 0.5rem 0;
    text-align: center;
    font-size: 0.875rem;
    color: gray;
  }
  .content01{
    /* width: 80%; */
    /* background-color: #87CEEB; */
    margin: 1rem ;
    font-size: 1rem;
    color: gray;
  }
  .contentBottom{
    margin: 15% 0 0.625rem 0;
    text-align: center;
    font-size: 0.875rem;
    color: gray;
  }
</style>
