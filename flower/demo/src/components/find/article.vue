<template>
  <div id="article">
    <!-- 关闭 -->
    <div class="close" @click="close">
      <van-icon name="close" />
    </div>
    <van-popup v-model="show" position="top" :style="{ height: '30%' }" closeable>
      分享内容
    </van-popup>

    <!-- 文章图片、标题部分 -->
    <div class="imgIn">
      <van-image width="100%" height="28rem" fit="cover" lazy-load :src="this.articleInfo.pic" />
      <!-- 图上的文字 -->
      <div class="imgWords">
        <p class="tWords">
          {{this.articleInfo.name}}
        </p>
        <p class="pWords">
          {{this.articleInfo.abs}}
        </p>
      </div>
    </div>

    <div class="content">
      <!-- 文本解析 -->
      <div class="markdown-body" v-html="value" />
      <!-- 底部 -->
      <div class="footer">
        *版权归花田小憩所有*
      </div>
      </div>
    </div>

</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import marked from 'marked';
  // import "mavon-editor/dist/css/index.css";
  import {
    mapState
  } from 'vuex';
  import {
    Lazyload,
    Image,
    Icon,
    Popup
  } from 'vant';

  Vue.use(Icon);
  Vue.use(Image);
  Vue.use(Lazyload);
  Vue.use(Popup);

  export default {
    data() {
      return {
        articleContent: [],
        show: false,
        value: '',
      }

    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        console.log(this.articleInfo)
        this.axios.get("/article/" + this.articleInfo.id).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            console.log(response.data.object)
            this.value = marked(response.data.object.contentMd)
            console.log(this.value)
          }
        }).catch(err => {
          console.log(err)
        });
      },
      more() {
        console.log(111111)
        this.show = true;
      },
      close() {
        this.$router.go(-1)
      }
    },
    created() {
      // 课程信息
      // this.lessonList = this.$route.query.lesson
      // console.log(this.articleInfo)
    },
    computed: mapState({
      articleInfo: state => state.article,
    }),
  }
</script>

<style>
  .imgIn {
    position: relative;
    /* margin-right: 0.625rem; */
  }

  .imgWords {
    color: white;
    position: absolute;
    bottom: 1.625rem;
    left: 1.875rem;
    /* background-color: yellowgreen; */
    width: 80%;
  }

  .tWords {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.25rem;
    margin: 0;
  }

  .pWords {
    margin: 0.5rem 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .close {
    position: fixed;
    /* background-color: #42B983; */
    /* width: 6.25rem; */
    /* height: 6.25rem; */
    top: 0.75rem;
    right: 0.75rem;
    letter-spacing: 0.2rem;
    font-size: 1.5rem;
    color: black;
    z-index: 1;
  }

  .more {
    position: fixed;
    /* background-color: #42B983; */
    /* width: 6.25rem; */
    /* height: 6.25rem; */
    top: 0.75rem;
    right: 3.5rem;
    letter-spacing: 0.2rem;
    font-size: 1.5rem;
    color: black;
    z-index: 1;
  }

  .content {
    height: 100%;
    padding: 0.5rem 2rem;
    margin-top: 5rem;
  }


  .detailContent {
    margin-top: 0.625rem;
    /* background-color: #CCA27C; */
    width: 100%;
    /* height: 10rem; */
  }

  .paragraph {
    text-align: center;
    color: #323232;
    font-size: 1.125rem;
  }

  .steps {
    font-size: 1rem;
    color: #323232;
  }

  .stepsImg {
    text-align: center;
    margin: 0 auto;
  }

  .footer {
    margin-top: 4rem;
    /* background-color: #87CEEB; */
    font-size: 0.75rem;
    width: 100%;
    /* height: 10rem; */
    color: #777777;
    text-align: center;
  }

  .markdown-body {
    /* background-color: #008080; */
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
  }

  .markdown-body p {
    /* text-align: left; */
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    /* background-color: palegoldenrod; */
    margin: 0 auto;
    color: #323232;
    font-size: 1.125rem;
  }

  .markdown-body p img {
    width: 100%;
    height: 12.5rem;
    text-align: center;
    margin: 1.25rem auto;
  }
</style>
