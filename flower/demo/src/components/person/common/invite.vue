<template>
  <div id="invite">
    <van-nav-bar title="金币充值">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <van-panel title="我的金币" desc="说明:100B=￥1" :status="this.userInfo.coin+'B'"></van-panel>
    <van-field size="large" class="recharge" label="充值" placeholder="请输入充值金额" readonly clickable :value="value" @touchstart.native.stop="show = true" />
    <van-number-keyboard v-model="value" :show="show" close-button-text="完成" :maxlength="6" @blur="show = false" />
    <van-button class="posBtn" type="primary" size="large" color="#CCA27C" @click="confirm(Form)">确认充值</van-button>
  </div>
</template>
<!-- <template>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-field v-model="outTradeNo" name="1" label="1" placeholder="1" />
      <van-field v-model="subject" name="2" label="2" placeholder="2" />
      <van-field v-model="totalAmount" name="3" label="3" placeholder="3" />
      <van-field v-model="body" name="4" label="4" placeholder="4" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template> -->

<script>
  import Vue from 'vue';
  import axios from "axios";
  import {
    mapState
  } from 'vuex';
  import {
    NavBar,
    Cell,
    CellGroup,
    Field,
    Toast,
    NumberKeyboard,
    Panel
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(Field);
  Vue.use(NumberKeyboard);
  Vue.use(Toast);
  Vue.use(Panel)

  export default {
    name: 'invite',
    data() {
      return {
        gold: 3000,
        digit: '',
        show: false,
        value: '',
        Form:{
          outTradeNo: '',
          subject: '',
          totalAmount:'',
          body: '',
          username:'',
        },
        dataShow: []
      }
    },
    methods: {
      onSubmit(Form) {
        let _this = this
        console.log('submit', Form);

        // this.$axios.post("/localhost:8800/api/alipay")
        //支付宝支付
         // if(response.data.status === 200){
         // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
         // let divForm = document.getElementsByTagName('divform')
         //    if (divForm.length) {
         //      document.body.removeChild(divForm[0])
         //    }
         //     const div=document.createElement('divform');
         //     div.innerHTML=resp.data; // data就是接口返回的form 表单字符串
         //     document.body.appendChild(div);
         //     document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
         //     document.forms[0].submit();
         // }else{
         //     this.$alert("错误："+resp.data,"提示",{
         //         confirmButtonText:'确定'
         //     });
         // }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      confirm(Form) {
        if (Form !== '') {
          var _this = this
          console.log(this.value);
          this.Form.totalAmount = this.value;
          console.log(this.Form.totalAmount)
          console.log(this.login.username)
          _this.$store.commit('getCoin',this.Form.totalAmount)
          this.axios.post("/order/alipay",{
            total_amount:this.Form.totalAmount,
            username:this.login.username,
          }).then(response => {
            console.log(response)
            // console.log(username)

            document.querySelector('body').innerHTML = response.data.str;
                        const div = document.createElement('div') // 创建div
                        div.innerHTML = response.data.str // 将返回的form 放入div
                        document.body.appendChild(div)
                        document.forms[0].submit()

          }).catch(err => {
            console.log(err)
          });
          // const toast = Toast.loading({
          //   duration: 0, // 持续展示 toast
          //   forbidClick: true,
          //   message: '加载中...',
          // });
          // const timer = setInterval(() => {
          //   clearInterval(timer);
          //   // 手动清除 Toast
          //   Toast.clear();
          //   Toast.success('充值成功');
          //   let plus = value+this.gold;
          //   // console.log(this.gold,plus)
          //   this.$router.push('/test')
          // }, 1500);
        } else {
          Toast.fail('请输入数值');
        }
      },
      // getData(){
      //   axios.post('/order/alipay',this.form)
      //           .then(res => {
      //             console.log(res.data);
      //           })
      //           .catch(err => {
      //             console.log(err);
      //           });
      // }
    },
    mounted() {
      // this.getData();
    },
    created() {
      // 课程信息
      // this.lessonList = this.$route.query.lesson
      console.log(this.userInfo)
      // console.log(this.testData.id)
    },
    computed:
      mapState({
        login:state=>state.currentUser,
        userInfo:state=>state.user,
        getCtoin:state=>state.total
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
  .van-panel__header-value span {
    color: #CCA27C;
    font-size: 1rem;
    font-weight: bold;
  }
  .recharge{
    margin-top: 1.25rem;
  }
  .cell {
    margin-bottom: 2rem;
  }

  .van-number-keyboard__close {
    color: #CCA27C;
  }

  .posBtn {
    position: absolute;
    bottom: 0;
  }
</style>
