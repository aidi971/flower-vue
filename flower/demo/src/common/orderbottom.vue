<template>
  <!-- 订单页面 底部导航栏 -->
  <div id="orderbottom">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="咨询" @click="onClickIcon" />
      <van-goods-action-button color="#3D3D3D" type="warning" text="报名参与" @click="showBase = true"/>
    </van-goods-action>
    <!-- <div class="sku-container">
      <van-sku v-model="showBase" :sku="skuData.sku" :goods="skuData.goods_info" :goods-id="skuData.goods_id"
        :hide-stock="skuData.sku.hide_stock" :quota="skuData.quota" :quota-used="skuData.quota_used" :initial-sku="initialSku"
        reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :close-on-click-overlay="closeOnClickOverlay"
        :show-add-cart-btn="showAddCartBtn" :custom-sku-validator="customSkuValidator" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
    </div> -->
  </div>
</template>

<script>
  import Vue from 'vue';
  // import skuData from './data';
  import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Sku
  } from 'vant';

  Vue.use(GoodsAction);
  Vue.use(GoodsActionButton);
  Vue.use(GoodsActionIcon);
  Vue.use(Sku);

  export default {
    data() {
      return {
        name: 'orderbottom',
        skuData: skuData,
        showBase: false,
        showCustom: false,
        showStepper: false,
        showSoldout: false,
        showAddCartBtn:false,
        closeOnClickOverlay: true,
        initialSku: {
          s1: '30349',
          s2: '1193',
          selectedNum: 1
        },
        customSkuValidator: () => '请选择xxx!',
      }
    },
    methods: {
      onClickIcon() {
        console.log('点击图标');
      },
      onClickButton() {
        console.log('点击按钮');
      },
      onBuyClicked(data) {
        console.log('buy:' + JSON.stringify(data));
        // console.log(JSON.stringify(data))
      },

      onAddCartClicked(data) {
        console.log('add cart:' + JSON.stringify(data));
      }
    }
  }
</script>

<style>
  .van-goods-action-icon__icon {
    width: 3rem;
    font-size: 1.375rem;
    color: #3D3D3D;
  }
</style>
