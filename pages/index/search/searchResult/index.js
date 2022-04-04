// pages/index/search/searchResult/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   * @param {Number} scrollViewHeight 列表显示高度
   * @param {Array} noticeArray 通知列表
   */
  data: {
    scrollViewHeight: "",
    noticeArray: [],
    motto: "Hello World",
    userInfo: {},
    canUseHeight: 600, //px not rpx!
    rightCellWidth: 162,
    filterToTop: 100, //the filter top to the screen top,it's titlebar+50 (35 is search height 15 is margin)
    nowChooseType: 1, //1 is all  2 is no read  3 is with extra file  4 is already save,
    choiceFilter: 0, //whether to show the filter
    typeValue: "",

    filterTypeData: [
      {
        text: "来自订阅",
        index: 1,
        color: "#00A5E3"
      },
      {
        text: "来自全部",
        index: 2,
        color: "#FF2349"
      }
    ],
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName") // 如需尝试获取用户信息可改为false
  },
  onShow: function (options) {
    // this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scrollHeight =
      app.globalData.systemInfo.safeArea.bottom -
      app.globalData.systemInfo.safeArea.top -
      app.globalData.capsuleHeight -
      50 -
      45;
    console.log(scrollHeight);
    console.log("可使用的高度为", app.globalData.canUseHeight);
    this.setData({
      canUseHeight:
        app.globalData.systemInfo.windowHeight -
        app.globalData.systemInfo.statusBarHeight -
        app.globalData.capsuleHeight -
        45,
      filterToTop:
        50 +
        app.globalData.systemInfo.statusBarHeight +
        app.globalData.capsuleHeight
    });

    let listSample = [];
    for (let i = 0; i < 9; ++i) {
      let sample = {
        id: 0,
        pid: 10086,
        title: "浙江大学学生参加圣彼得堡彼得大帝理工大学线上冬季课程项目",
        category: "对外交流",
        source: "本科生院",
        attachment: true,
        star: true,
        stickTop: false,
        redDot: true
      };
      listSample.push(sample);
      listSample[i].id = i;
    }
    let rightWidth = (324 * app.globalData.systemInfo.windowWidth) / 750.0;
    console.log("RightCellWidth = ", rightWidth);
    this.setData({
      scrollViewHeight: scrollHeight,
      rightCellWidth: rightWidth,
      noticeArray: listSample,
      typeValue: options.typeValue
    });
  },
  onClickFilter(e) {
    console.log("filter to top", this.data.choiceFilter);
    let choiceFilter = this.data.choiceFilter;
    if (choiceFilter != e.detail) {
      choiceFilter = 1 - choiceFilter;
    }
    this.setData({ choiceFilter: choiceFilter });
  },
  onChangeType(e) {
    if (e.currentTarget.dataset.index) {
      this.setData({ nowChooseType: e.currentTarget.dataset.index });
      console.log("更改选择类型为", e.currentTarget.dataset.index);
      this.setData({
        choiceFilter: false
      });
    }
  },

  /**
   * 单选框改变
   */
  onRadioChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  /**
   * 折叠/展开折叠区域
   */
  toggleFoldList(event) {
    // if (this.data.foldingTopArray) {
    //   this.setData({
    //     foldingTopArray: false,
    //     foldAreaHeight: this.data.topFoldedNoticeNumber * 259
    //   });
    // } else {
    //   this.setData({
    //     foldingTopArray: true,
    //     foldAreaHeight: this.data.topFoldedNoticeNumber * 0
    //   });
    // }
  },

  onSearch(e, a) {
    console.log(233);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
