<template>
  <div>
    <van-nav-bar>
      <van-icon @click="back" name="cross" slot="left" size="1.5rem" />
    </van-nav-bar>
    <p class="resTitle">欢迎你，来到植物的世界</p>
    <van-form>
      <van-field class="fieldStyle" v-model="username" placeholder="用户名" />
      <van-field class="fieldStyle" v-model="password" type="password" placeholder="密码" />
      <div class="botWords">
        <span class="botGrey">注册使用即表示同意</span>
        <div style="margin-top: 1rem;">
          <span>《花田小憩服务条例》</span>
          <span class="botGrey">和</span>
          <span>《隐私政策》</span>
        </div>
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit()">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="login">
      <span class="botGrey">还没有账号？</span>
      <span @click="register">点击注册</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    mapMutations
  } from 'vuex';
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
        userToken: '',
      }
    },
    methods: {
      ...mapMutations(['login','getUser']),
      back() {
        this.$router.replace('/find')
      },
      submit(username, password) {
        let _this = this;
        // console.log(this.username,this.password)
        if (this.username == "" || this.password == "") {
          Toast.fail('用户信息不能为空')
        } else {
          this.axios.post("/login", {
            username: this.username,
            password: this.password
          }).then(response => {
            console.log(response)
            console.log(response.config.data)
            if (response.data.status == 200) {
              Toast.success('登录成功');
              // console.log(response.data.object)
              _this.$store.commit('login',response.data.object)
              _this.$store.commit('getUser',response.data.object)
              _this.$router.push('person');
            } else {
              Toast.fail('登录失败')
            }
          }).catch(err => {
            console.log(err)
          });
        }

      },
      register() {
        this.$router.push('/register')
      }
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
