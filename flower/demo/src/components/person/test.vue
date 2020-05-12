<template>
  <div>test</div>
  <!-- <mavon-editor class="md" :value="opts.api_doc" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen"
    :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable" :scrollStyle="prop.scrollStyle"></mavon-editor> -->
</template>



<script>
  import Vue from 'vue';
  import axios from "axios";

  export default {
    data() {
      return {
        // opts.api_doc 即为md文档内容
        opts: null,
      },
    },
    methods: {
      
      getData(){
        console.log('11')
        this.axios.get("/findall/course/").then(res => {
        console.log(res)
      }).catch(err => {
          console.log(err)
        });
      }

      //接口获取md文档内容，可参考
      // async queryOpts() {
      //   let para = {}
      //   para.items = ['api_doc']
      //   let res = await requestApi.queryOpts(para)
      //   if (res.data.code !== 200) {
      //     this.$message({
      //       message: res.data.msg,
      //       type: 'error'
      //     })
      //     return
      //   }
      //   this.opts = res.data.data
      // }
    },
    mounted() {
      // this.queryOpts()
      this.getData();
    }
  }
