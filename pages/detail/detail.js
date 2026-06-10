// pages/detail/detail.js — 商品详情页逻辑
const allProducts = require('../../utils/products');

Page({
  data: {
    product: {},
    relatedProducts: []
  },

  onLoad(options) {
    const id = parseInt(options.id) || 1;
    const product = allProducts.find(p => p.id === id);

    if (!product) {
      wx.showToast({ title: '产品不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    // 更新标题
    wx.setNavigationBarTitle({ title: product.name });

    // 推荐同类产品（排除当前）
    const related = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 6);

    this.setData({ product, relatedProducts: related });
  },

  // ── 跳转其他详情 ──
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  // ── 返回列表 ──
  goBack() {
    wx.navigateBack({
      fail: () => {
        // 如果是扫码直接进入（没有上一页），跳到首页
        wx.redirectTo({ url: '/pages/index/index' });
      }
    });
  },

  // ── 分享 ──
  onShareAppMessage() {
    const p = this.data.product;
    return {
      title: `${p.brand} ${p.name} - ¥${p.price}`,
      path: `/pages/detail/detail?id=${p.id}`,
      imageUrl: p.image
    };
  },

  onShareTimeline() {
    const p = this.data.product;
    return {
      title: `${p.name} — 电竞外设参数详解`,
      query: `id=${p.id}`
    };
  }
});
