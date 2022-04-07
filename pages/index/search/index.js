import { HTTP } from "../../../utils/http";

// pages/index/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isChooseDelete: false,
    historySearch: [],
    focusCenter: [],
    arrowUp: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tmpCenter = [];
    let http = new HTTP();
    http._request("notice/get/top10", function(res) {
      let data = res.data.notices;
          if (data) {
            data.forEach(function (value, index) {
              let tmp = {
                id: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
              };
              tmpCenter.push(tmp);
          })
    }
  }, function() {})

    this.setData({ focusCenter: tmpCenter });
    let tmphistorySearch = this.getTheStorage();
    this.setData({
      historySearch: tmphistorySearch
    });
  },
  /**
   * 获取与绑定点击搜索按钮的时间
   * @param {Object} e
   */
  onClickSearch(e) {
    console.log(e.detail.value);
    this.addToStorage(e.detail.value);
    let tmpSearch = this.getTheStorage();
    this.setData({ isChooseDelete: false, historySearch: tmpSearch });
    wx.navigateTo({
      url: "searchResult/index?typeValue=" + e.detail.value
    });
  },
  /**
   * 删除所有缓存的历史记录
   */
  onDeleteAll() {
    console.log("按下全部删除");
    let that = this;
    wx.showModal({
      confirmText: "确定",
      confirmColor: "red",
      cancelText: "再想想",
      title: "",
      content: "确定要删除搜索历史吗？",
      success: function (res) {
        if (res.confirm) {
          try {
            wx.removeStorageSync("NOTIFY_HISTORY_SEARCH");
          } catch (e) {
            console.log(e);
          }
          let tmpSearch = that.getTheStorage();
          console.log(tmpSearch);
          that.setData({ historySearch: tmpSearch });
        }
      }
    });
  },
  /**
   * 某个关注热点被点击之后的绑定函数
   * @param {Object} e
   */
  onClickHosItem(e) {
    console.log(e.currentTarget.dataset);
  },

  onSearch(e, a) {
    console.log(e.detail.value);
    wx.navigateTo({
      url: "searchResult/index?typeValue=" + e.detail.value
    });
  },

  /**
   * 获取缓存记录
   */
  getTheStorage() {
    let tmphistorySearch = [];
    try {
      tmphistorySearch = wx.getStorageSync("NOTIFY_HISTORY_SEARCH") || [];
    } catch {
      console.log("发生错误");
    }
    return tmphistorySearch;
  },
  /**
   * 将搜索记录写进存储内
   * @param {String} value
   */
  addToStorage(value) {
    if (!value || !value.length) return false;
    let records = [];
    try {
      records = wx.getStorageSync("NOTIFY_HISTORY_SEARCH") || [];
    } catch {
      console.log("发生错误");
      return false;
    }
    for (let i = 0; i < records.length; i++) {
      if (records[i] === value) {
        records[i] = records[0];
        records[0] = value;
        break;
      }
    }
    if (records.length === 0) {
      records.push(value);
    } else if (value != records[0]) records.unshift(value);
    try {
      records = wx.setStorageSync("NOTIFY_HISTORY_SEARCH", records);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  },
  onClickArrowDown() {
    this.setData({ arrowUp: true });
  },
  onClickArrowUp() {
    this.setData({ arrowUp: false });
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
  onShareAppMessage: function () {}
});
