<template>
  <div>
    <van-nav-bar title="账号管理">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <!-- 账号管理表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <van-calendar v-model="showCalendar" color="#cca27c" @confirm="onConfirm" :min-date="minDate" />
      <van-button round type="primary" block native-type="submit">保存</van-button>
    </van-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    NavBar,
    Toast,
    Form,
    Uploader,
    Calendar
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Form);
  Vue.use(Uploader);
  Vue.use(Calendar);

  export default {
    data() {
      return {
        uploader: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        }],
        fileList: [],
        value: '',
        showCalendar: false,
        minDate: new Date(1980, 0, 1),
        // maxDate: new Date(1980, 0, 31)
        username: '',
        password: '',
      };
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },

      beforeRead(file) {
        // 返回布尔值
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          return false;
        }
        return true;
      },

      asyncBeforeRead(file) {
        // 返回 Promise
        return new Promise((resolve, reject) => {
          if (file.type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片');
            reject();
          } else {
            let img = new File(["foo"], "bar.jpg", {
              type: "image/jpeg",
            });
            resolve(img);
          }
        });
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        // console.log(file);
      },
      onConfirm(date) {
        this.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        // console.log(date.getFullYear())
        this.showCalendar = false;
      },
      onSubmit(values) {
        console.log('submit', values);
      },
    }
  }
</script>

<style>
  .van-nav-bar .van-icon {
    color: black;
  }

  .van-nav-bar__text {
    color: black;
  }

  .van-button--block {
    width: 80%;
    margin: 10rem auto 0rem auto;
  }

  .van-button--primary {
    background-color: #cca27c;
    border: 1px solid #cca27c;
  }
</style>
