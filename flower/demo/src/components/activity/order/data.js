export default {
  sku: {
    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
    tree: [
    ],
    // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
    list: [
      {
        // s1: '1234',
        goods_id: 946755
      },
    ],
    price: '50',
    stock_num: 227, // 商品总库存
    none_sku: true, // 是否无规格商品
    collection_id: 2261,
    hide_stock: false // 是否隐藏剩余库存
  },
};
