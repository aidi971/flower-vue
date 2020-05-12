<template>
  <div>
    <van-nav-bar>
      <van-icon @click="back" name="cross" slot="left" size="1.5rem" />
    </van-nav-bar>
    <p class="resTitle">欢迎你，来到植物的世界</p>
    <van-form>
      <van-field class="fieldStyle" v-model="username" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field class="fieldStyle" v-model="password" type="password" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div class="botWords">
        <span class="botGrey">注册使用即表示同意</span>
        <div style="margin-top: 1rem;">
          <span>《花田小憩服务条例》</span>
          <span class="botGrey">和</span>
          <span>《隐私政策》</span>
        </div>
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="login">
      <span class="botGrey">已有账号？</span>
      <span @click="login">点击登录</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';
  import {
    NavBar,
    Icon,
    Form,
    Field,
    Button,
    Toast
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Icon);
  Vue.use(Form);
  Vue.use(Field);
  Vue.use(Button);
  Vue.use(Toast);

  export default {
    data() {
      return {
        username: '',
        password: '',
        totalTime: 3,
        disable:false,
        now:''
      }
    },
    methods: {
      back() {
        this.$router.replace('/find')
      },
      submit(username,password) {
        this.now = moment().format('YYYY/MM/DD HH:mm')
        // console.log(this.now)
        // this.$router.push({path:'/message',query:{name:this.now}});
        if (this.username == "" || this.password == "") {
          Toast.fail('用户信息不能为空')
        } else {
        this.axios.post("/user/add",{
          username:this.username,
          password:this.password
        }).then(response => {
          console.log(response.data)
          if(response.data.status == 200){
            Toast.success('注册成功');
            this.$router.push('/login')
          }else{
            Toast.fail('注册失败')
          }
        }).catch(err => {
          console.log(err)
        });
        }
      },
      login(){
        this.$router.push('/login')
      },
      countDown () {
        if (this.disable) return  //改动的是这两行代码
         this.disable = true
       this.content = this.totalTime + 's后重发' //解决60秒不见了的问题
       let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '发送验证码'
          this.totalTime = 3
          this.disable = false
          }
       },1000)
      },
    }
  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: darkgray;
  }

  .resTitle {
    text-align: center;
    font-size: 1.7rem;
    margin: 3.25rem 0;
  }

  .botWords {
    text-align: center;
    font-size: 0.75rem;
    margin: 3rem 0;
  }
  .login {
    text-align: center;
    font-size: 1rem;
    margin: 3.5rem 0;
  }

  .botGrey {
    color: grey;
  }

  .fieldStyle {
    /* background-color: pink; */
    margin: 0.625rem auto;
    width: 90%;
    border-radius: 1.625rem;
    box-shadow: 0 0 0.05rem lightgrey;
  }

  .van-button--primary {
    background-color: #cca27c;
    border: 0.0625rem solid #cca27c;
  }

  .van-button--info {
    background-color: #cca27c;
    border: 0.0625rem solid #cca27c;
  }
</style>
