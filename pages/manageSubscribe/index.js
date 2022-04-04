// pages/manageSubscribe/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: 0,
    choiceFilter: 0,
    topHeight: 0, //顶端各个组件的高度，提供给SubscribeIndex索引锚点定位
    confirmBut: false,
    num: 0,
    isEdit: false,
    websites: [
      {
        index: "B",
        items: [
          { title: "本科生院", label: "www.bobo.com", isChosen: false },
          { title: "本科生教务网", label: "www.bo.com", isChosen: true }
        ]
      },
      {
        index: "D",
        items: [
          { title: "电气工程学院", label: "www.didi.com", isChosen: false },
          {
            title: "动物科学学院",
            label: "www.animal.zju.edu.cn",
            isChosen: true
          }
        ]
      },
      {
        index: "F",
        items: [{ title: "法学院", label: "www.fa.com", isChosen: false }]
      },
      {
        index: "G",
        items: [
          { title: "公共管理学院", label: "www.gonggong.com", isChosen: false },
          { title: "光电学院", label: "www.gala.com", isChosen: false }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let query = wx.createSelectorQuery().in(this);
    query.select("#titleBar").boundingClientRect();
    query.select("#header").boundingClientRect();
    query.select("#footer").boundingClientRect();
    query.exec((res) => {
      // 分别取出高度
      let titleBarHeight = res[0].height;
      let headerHeight = res[1].height;
      let footerHeight = res[2].height;
      let scrollViewHeight =
        app.globalData.systemInfo.windowHeight -
        titleBarHeight -
        headerHeight -
        footerHeight;
      let topHeight = titleBarHeight + headerHeight;
      this.setData({
        topHeight: topHeight,
        scrollViewHeight: scrollViewHeight
      });
    });
    this.updateData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {},

  /**
   * 点击按钮后增加订阅
   */
  addSubscribe: function () {
    if (this.ifAdded()) {
      console.log(this.selectComponent("#SubscribeIndex").data.websites);
      //TODO:利用后端更新websites以及tags
    } else {
      console.log("订阅为空");
    }
  },

  /**
   * 判断是否有新增的订阅
   */
  ifAdded: function () {
    let tags = this.selectComponent("#SubscribeIndex").data.websites;
    let ifAdded = false;
    tags.forEach((currentValue) => {
      currentValue.items.forEach((item) => {
        if (item.isChosen) {
          ifAdded = true;
        }
      });
    });
    // console.log("ifAdded",ifAdded);
    return ifAdded;
  },

  /**
   * 每次触碰组件区域都更新数据（调用组件实例检查当前选中了几个）
   */
  updateData: function () {
    if (this.ifAdded()) {
      let num = 0;
      let tags = this.selectComponent("#SubscribeIndex").data.websites;
      tags.forEach((currentValue) => {
        currentValue.items.forEach((item) => {
          if (item.isChosen) {
            num++;
          }
        });
      });
      this.setData({
        confirmBut: true,
        num: num
      });
    } else {
      this.setData({
        confirmBut: false
      });
    }
  },

  /**
   * 更改是否展示筛选
   */
  onClickFilter(e) {
    let choiceFilter = this.data.choiceFilter;
    if (choiceFilter != e.detail) {
      choiceFilter = 1 - choiceFilter;
      this.selectComponent("#SubscribeIndex").onClickFilter();
    }
    this.setData({ choiceFilter: choiceFilter });
  },

  /**
   * 利用该页面中的search组件的值，传入SubscribeIndex组件进行搜索筛选
   */
  search() {
    this.selectComponent("#SubscribeIndex").search(
      this.selectComponent("#search").data.type2Value
    );
  }
});
