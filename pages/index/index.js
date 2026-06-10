// pages/index/index.js — 商品列表首页逻辑
const allProducts = require('../../utils/products');

Page({
  data: {
    keyword: '',
    currentTab: 'all',
    allProducts: [],
    filteredList: []
  },

  onLoad() {
    this.setData({
      allProducts: allProducts,
      filteredList: this.sortByPrice(allProducts)
    });
  },

  onShow() {
    // 每次返回首页刷新列表
    this.applyFilter();
  },

  // ── 搜索 ──
  onSearch(e) {
    this.setData({ keyword: e.detail.value.trim() });
    this.applyFilter();
  },

  // ── 分类切换 ──
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    this.applyFilter();
  },

  // ── 应用筛选 ──
  applyFilter() {
    let list = [...this.data.allProducts];
    const { keyword, currentTab } = this.data;

    if (currentTab !== 'all') {
      list = list.filter(item => item.category === currentTab);
    }

    if (keyword) {
      const kw = keyword.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(kw) ||
        item.brand.toLowerCase().includes(kw) ||
        item.model.toLowerCase().includes(kw) ||
        item.tags.some(t => t.toLowerCase().includes(kw))
      );
    }

    list = this.sortByPrice(list);
    this.setData({ filteredList: list });
  },

  // ── 按价格从低到高排序 ──
  sortByPrice(list) {
    return list.sort((a, b) => a.price - b.price);
  },

  // ── 跳转详情 ──
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  // ── 下拉刷新 ──
  onPullDownRefresh() {
    this.setData({ keyword: '', currentTab: 'all' });
    this.applyFilter();
    wx.stopPullDownRefresh();
  },

  // ── 分享 ──
  onShareAppMessage() {
    return {
      title: '热门电竞外设参数大全',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: '电竞鼠标键盘参数全览'
    };
  }
});
