// app.js
App({
  /**
   * @param {Object}  systemInfo record the information of user phone
   * all the information is PX!!!!! not rpx
   */
  globalData: {
    userInfo: null, //用户信息
    systemInfo: {
      safeArea: {}, //安全区域，iphoneX以下用户该区域的宽高和window值一样
      windowHeight: null, //整个手机的宽高
      windowWidth: null,
      statusBarHeight: null //顶部状态栏高度 时间 电量那里
    },
    capsuleHeight: null, //小胶囊的高度
    canUseHeight: null //除去顶部title-bar 底部tab-bar还能使用的高度
  },
  /**
   * onLaunch is used to calculate the some used information for global app
   */
  async onLaunch() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.systemInfo = {
        safeArea: res.safeArea,
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        statusBarHeight: res.statusBarHeight
      };
    } catch (err) {
      console.error("get information error", err);
    }
    let capsule = wx.getMenuButtonBoundingClientRect();
    if (capsule) {
      let capsulePadding =
        capsule.top - this.globalData.systemInfo.statusBarHeight;
      this.globalData.capsuleHeight = capsule.height + capsulePadding * 2;
    } else this.globalData.capsuleHeight = 32;
    console.log("get the data of user phone", this.globalData);
    if (this.globalData.systemInfo && this.globalData.capsuleHeight) {
      this.globalData.canUseHeight =
        this.globalData.systemInfo.safeArea.height -
        this.globalData.systemInfo.statusBarHeight -
        this.globalData.capsuleHeight;
    }
  }
});