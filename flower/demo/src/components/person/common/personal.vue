<template>
  <div>
    <van-nav-bar title="个人资料">
      <van-icon name="arrow-left" slot="left" size="1.5rem" @click="onClickLeft" />
    </van-nav-bar>
    <!-- 个人资料表单 -->
    <van-form>
      <van-field v-model="form.username" name="用户名" label="用户名" placeholder="用户名"  />
      <van-field v-model="form.password" type="password" name="密码" label="密码" placeholder="密码" />
      <van-field v-model="form.phone" name="请输入手机号码" label="用户名" placeholder="手机号码"  />
      <!-- <van-field label="手机号码" placeholder="请输入手机号码" readonly clickable :value="form.phone" @touchstart.native.stop="show = true" />
      <van-number-keyboard v-model="form.phone" :show="show" close-button-text="完成" @blur="show = false" /> -->
      <!-- <van-field readonly clickable name="calendar" :value="form.birthday" label="生日" placeholder="点击选择日期" @click="showCalendar = true"
        :rules="[{ required: true, message: '请填写生日' }]" />
      <van-calendar v-model="showCalendar" color="#cca27c" @confirm="onConfirm" :min-date="minDate" /> -->
      <van-button round type="primary" block @click="onSubmit(form)">保存</van-button>
    </van-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    mapState
  } from 'vuex';
  import {
    NavBar,
    Toast,
    Form,
    Uploader,
    Calendar,
    DatetimePicker,
    Popup
  } from 'vant';

  Vue.use(NavBar);
  Vue.use(Form);
  Vue.use(Uploader);
  Vue.use(Calendar);
  Vue.use(DatetimePicker);
  Vue.use(Popup);
  Vue.use(Toast)

  export default {
    data() {
      return {
        show: false,
        number: '',
        uploader: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        }],
        fileList: [],
        value: '',
        showCalendar: false,
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(2025, 10, 1),
        // maxDate: new Date(1980, 0, 31)
        username: '',
        password: '',
        currentDate: new Date(),
        show: false,
        form:{
          username:'',
          password:'',
          phone:'',
          birthday:''
        }
      };
    },
    methods: {
      onClickLeft() {
        this.$router.push('/person')
      },
      onConfirm(date) {
        this.form.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        // console.log(date.getFullYear())
        this.showCalendar = false;
      },
      onSubmit(form) {
        if(form.username==''){
          Toast.fail('用户名不能为空');
        }
        // else if(form.phone.length < 11){
        //   Toast.fail('请输入正确手机号');
        // }
        else if(form.birthday == ''){
          Toast.fail('生日不能为空');
        }else{
          console.log(form);
          const username = this.userInfo.username
          this.axios.post('/user/update/by/'+username,this.form,{
            username:username,
            password:this.userInfo.password,
            // birthday:this.userInfo.birthday,
            phone:this.userInfo.phone
          }).then(res => {
            console.log(res.data)
          }).catch(err => {
            console.log(err)
          })
        }

      },
      showPopup() {
        this.show = true;
      }
    },
    created() {
      // 课程信息
      // this.lessonList = this.$route.query.lesson
      console.log(this.userInfo)
      this.form.username = this.userInfo.username;
      // this.form.password = this.userInfo.password;
      this.form.phone = this.userInfo.phone;
      this.form.birthday = this.userInfo.birthday;
      // console.log(this.testData.id)
    },

    computed:
      mapState({
        userInfo:state=>state.user,

      }),
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
