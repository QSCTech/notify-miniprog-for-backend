// pages/typeDetails/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    noticeArray: [],
    scrollHeight: 0,
    showCollapse: false,
    websites: [
      { title: "全部", isChosen: true },
      { title: "勃勃学院", isChosen: false },
      { title: "勃学院", isChosen: false },
      { title: "弟弟学院", isChosen: false },
      { title: "二极管学院", isChosen: false },
      { title: "两面包夹芝士", isChosen: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let query = wx.createSelectorQuery().in(this);
    query.select("#titleBar").boundingClientRect();
    query.select("#header").boundingClientRect();
    query.exec((res) => {
      // 分别取出高度
      let titleBarHeight = res[0].height;
      let headerHeight = res[1].height;
      let scrollViewHeight =
        app.globalData.systemInfo.windowHeight -
        titleBarHeight -
        headerHeight +
        20;
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    });
    let listSample = [];
    for (let i = 0; i < 9; ++i) {
      let sample = {
        id: 0,
        pid: 10086,
        title: "浙江大学学生参加圣彼得堡彼得大帝理工大学线上冬季课程项目",
        category: "对外交流",
        source: "本科生院",
        attachment: false,
        star: true,
        stickTop: false,
        redDot: true
      };
      listSample.push(sample);
      listSample[i].id = i;
    }
    console.log(listSample);
    this.setData({
      type: options.type,
      noticeArray: listSample
    });
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
   * 展开筛选处
   * @param {object} event 点击事件
   */
  listWebsites: function (event) {
    this.setData({
      showCollapse: !this.data.showCollapse
    });
  },

  /**
   * 修改筛选
   * @param {object} e 点击事件
   */
  changeChosen: function (e) {
    let tmp = this.data.websites;
    tmp = tmp.map((item) => {
      let newItem = item;
      newItem.isChosen = false;
      return newItem;
    });
    // tmp[e.target.id].isChosen = !tmp[e.target.id].isChosen;
    tmp[e.target.id].isChosen = true;
    this.setData({
      websites: tmp,
      showCollapse: false
    });
  },
  /**
   * 点击遮罩层的其他地方，收起遮罩
   */
  onClickHide: function () {
    this.setData({ showCollapse: false });
  }
});
