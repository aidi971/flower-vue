<template>
  <div>
    <!-- 基础用法 -->
    <div class="sku-container">
      <van-sku v-model="showBase" :sku="skuData.sku" :goods="skuData.goods_info" :goods-id="skuData.goods_id"
        :hide-stock="skuData.sku.hide_stock" :quota="skuData.quota" :quota-used="skuData.quota_used" :initial-sku="initialSku"
        reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :close-on-click-overlay="closeOnClickOverlay"
        :custom-sku-validator="customSkuValidator" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
      <van-button block type="primary" @click="showBase = true">
        xxxx
      </van-button>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Sku
  } from 'vant';

  Vue.use(Sku);
  import skuData from './data';
  export default {
    data() {
      return {
        skuData: skuData,
        showBase: false,
        showCustom: false,
        showStepper: false,
        showSoldout: false,
        closeOnClickOverlay: true,
        initialSku: {
          s1: '30349',
          s2: '1193',
          selectedNum: 3
        },
        customSkuValidator: () => '请选择xxx!',
      };
    },

    methods: {
      onBuyClicked(data) {
        console.log('buy:' + JSON.stringify(data));
        // console.log(JSON.stringify(data))
      },

      onAddCartClicked(data) {
        console.log('add cart:' + JSON.stringify(data));
      },
    }
  };
</script>

<style>
  .sku-container {
    padding: 0 15px;
  }
</style>
