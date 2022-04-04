// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    scrollViewHeight: 0,
    foldHeight: 120,
    folded: true,
    websites: [
      { title: "本科生院", label: "www.bobo.com" },
      { title: "研究生院", label: "www.bo.com" },
      { title: "求是学院", label: "www.didi.com" },
      { title: "云峰学园", label: "www.erjiguan.com" },
      { title: "竺可桢学院", label: "www.womenlianhe.com" },
      { title: "经济学院", label: "www.miao.com" },
      { title: "计算机科学与技术学院", label: "www.miaomiao.com" },
      { title: "软件学院", label: "www.wang.com" },
      { title: "建筑工程学院", label: "www.wangwang.com" }
    ],
    types: [
      { img: "icon-cup", name: "评奖评优", color: "#ff9a18" },
      { img: "icon-baseball", name: "对外交流", color: "#00a5e3" },
      { img: "icon-hat", name: "升学事宜", color: "#22b573" },
      { img: "icon-medal", name: "竞赛信息", color: "#6f74ff" },
      { img: "icon-flag", name: "实践活动", color: "#b29779" },
      { img: "icon-calculator", name: "教务信息", color: "#ff3696" },
      { img: "icon-communist", name: "党团通知", color: "#ff2349" },
      { img: "icon-link", name: "其他", color: "#969696" }
    ]
  },
  onShow() {
    this.getTabBar().init();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      scrollViewHeight: app.globalData.canUseHeight
    });
  },

  /**
   * 跳转至订阅页
   */
  toSubscribe() {
    wx.navigateTo({
      url: "/pages/manageSubscribe/index"
    });
  },

  /**
   * 跳转至typeDetails页并传入type值
   * @param {object} e 点击事件
   */
  intoType(e) {
    console.log(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: "../typeDetails/index?type=" + e.currentTarget.dataset.name
    });
  },

  /**
   * 已订阅网站的折叠/展开
   */
  toggleFoldList() {
    this.setData({
      folded: !this.data.folded
    });
  },
  /**
   * 按下搜索框的时间，导航到搜索页面
   */
  onClickWrap() {
    wx.navigateTo({
      url: "../index/search/index"
    });
  }
});
