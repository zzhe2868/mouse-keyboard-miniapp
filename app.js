App({
  onLaunch() {
    // 检查是否通过扫一扫进入
    const launchOptions = wx.getLaunchOptionsSync();
    if (launchOptions.scene === 1011 || launchOptions.scene === 1012 || launchOptions.scene === 1013) {
      // 扫码进入
      this.globalData.fromScan = true;
    }
  },

  globalData: {
    fromScan: false
  }
});
