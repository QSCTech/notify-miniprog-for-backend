import {
  HTTP
} from "../../utils/http";

// pages/index/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   * @param {Number} scrollViewHeight 列表显示高度
   * @param {Array} noticeArray 通知列表
   */
  data: {
    scrollViewHeight: "",
    collectedNoticeArray: [],
    notReadNoticeArray: [],
    appendixNoticeArray: [],
    topNoticeArray: [],
    topFoldedNoticeArray: [],
    topFoldedNoticeNumber: 0,
    foldingTopArray: false,
    foldAreaHeight: 0,
    noticeArray: [],
    motto: "Hello World",
    userInfo: {},
    canUseHeight: 600, //px not rpx!
    rightCellWidth: 162,
    filterToTop: 100, //the filter top to the screen top,it's titlebar+50 (35 is search height 15 is margin)
    nowChooseType: 1, //1 is all  2 is no read  3 is with extra file  4 is already save,
    choiceFilter: false, //whether to show the filter,
    refreshOn: false,
    scrollTop: 0,
    finale: false,
    loadingMore: false,
    pageSize: 1,

    filterTypeData: [{
        text: "全部",
        index: 1,
        color: "#00A5E3"
      },
      {
        text: "未读",
        index: 2,
        color: "#FF2349"
      },
      {
        text: "含附件",
        index: 3,
        color: "#6F74FF"
      },
      {
        text: "收藏",
        index: 4,
        color: "#FF9A18"
      }
    ],
    hazserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName") // 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const http = new HTTP();
    const that = this;
    const nowChooseType = this.data.nowChooseType;
    const noticeArray = this.data.noticeArray;
    const topNoticeArray = this.data.topNoticeArray;
    let scrollHeight =
      app.globalData.systemInfo.safeArea.bottom -
      app.globalData.systemInfo.safeArea.top -
      app.globalData.capsuleHeight -
      50 -
      45;
    console.log(scrollHeight);
    console.log("可使用的高度为", app.globalData.canUseHeight);
    this.setData({
      canUseHeight: app.globalData.canUseHeight ?
        app.globalData.canUseHeight - 50 : 600,
      filterToTop: 50 +
        app.globalData.systemInfo.statusBarHeight +
        app.globalData.capsuleHeight
    });
    let listSample = [];
    let topListSample = [];
    const request = new Promise(function (resolve) {
      http._request('notice/get/entry', function (res) {
          let data = res.data.notices;
          if (data) {
            data.forEach(function (value, index) {
              let tmp = {
                id: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
                star: value.is_collect,
                redDot: !value.is_read,
                attachment: value.has_appendix,
              };
              console.log(value.category);
              listSample.push(tmp);
            })
          }
          
          data = res.data.top_notices;
          if (data) {
            data.forEach(function (value, index) {
              let tmp = {
                id: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
                star: value.is_collect,
                redDot: !value.is_read,
                attachment: value.has_appendix,
              };
              topListSample.push(tmp);
            })
          }
          console.log("true");
          resolve();
        },
        function () {}, {
          choice: nowChooseType - 1,
          page_size: that.data.pageSize,
          page_num: noticeArray.length/that.data.pageSize + 1
        });
    })
    request.then(function () {
      let rightWidth = (324 * app.globalData.systemInfo.windowWidth) / 750.0;
      console.log("RightCellWidth = ", rightWidth);
      that.page = 0;
      that.pageSize = 8;
      that.setData({
        scrollViewHeight: scrollHeight,
        topFoldedNoticeNumber: topListSample.length - 2,
        topNoticeArray: topListSample.slice(0,2),
        topFoldedNoticeArray: topListSample.slice(2, topListSample.length),
        foldingTopArray: true,
        rightCellWidth: rightWidth,
        noticeArray: listSample
      });
    }, function(error){})
  },

  onClickFilter() {
    console.log("filter to top", this.data.filterToTop);
    this.setData({
      choiceFilter: !this.data.choiceFilter
    });
  },
  onChangeType(e) {
    if (e.currentTarget.dataset.index) {
      this.setData({
        nowChooseType: e.currentTarget.dataset.index
      });
      console.log("更改选择类型为", e.currentTarget.dataset.index);
      this.setData({
        choiceFilter: false
      });
      this.refreshList();
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
  toggleFoldList() {
    if (this.data.foldingTopArray) {
      this.setData({
        foldingTopArray: false,
        foldAreaHeight: this.data.topFoldedNoticeNumber * 259
      });
    } else {
      this.setData({
        foldingTopArray: true,
        foldAreaHeight: this.data.topFoldedNoticeNumber * 0
      });
    }
  },

  refreshList() {
    const http = new HTTP();
    const that = this;
    const nowChooseType = this.data.nowChooseType;
    console.log("type" + nowChooseType);
    let listSample = [];
    let topListSample = [];
    let notReadListSample = [];
    let appendixListSample = [];
    let collectedListSample = [];
    this.setData({
      refreshOn: true
    });
    const request = new Promise(function (resolve) {
      http._request('notice/get/entry', function (res) {
          let data = res.data.notices;
          if (data){
            data.forEach(function (value, index) {
              let tmp = {
                id: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
                star: value.is_collect,
                redDot: !value.is_read,
                stickTop: false,
                attachment: value.has_appendix,
              };
              listSample.push(tmp);
            })
          }
          data = res.data.top_notices;
          if (data){
            data.forEach(function (value, index) {
              let tmp = {
                iid: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
                star: value.is_collect,
                redDot: !value.is_read,
                stickTop: true,
                attachment: value.has_appendix,
              };
              topListSample.push(tmp);
            })
          }
          
          
          resolve();
        },
        function () {}, {
          choice: nowChooseType - 1,
          page_size: 1,
          page_num: 1
        });
    })
    request.then(function () {
      that.setData({
        topFoldedNoticeNumber: topListSample.length - 2,
        topNoticeArray: topListSample.slice(0,2),
        topFoldedNoticeArray: topListSample.slice(2, topListSample.length),
        foldingTopArray: true,
        noticeArray: listSample,
        refreshOn: false,
        finale: false
      });
    }, function(error) {})
  },

  getMoreNotice() {
    const that = this;
    const nowChooseType = this.data.nowChooseType;
    var listSample = that.data.noticeArray;
    if (this.data.finale) return;
    this.setData({
      loadingMore: true
    });

    const http = new HTTP();
    const request = new Promise(function (resolve) {
      http._request('notice/get/entry', function (res) {
          const data = res.data.notices;
          if (data){
            data.forEach(function (value, index) {
              let tmp = {
                id: index,
                pid: value.notice_id,
                title: value.title,
                category: value.category,
                source: value.from_faculty,
                star: value.is_collect,
                redDot: !value.is_read,
                stickTop: false,
                attachment: value.has_appendix,
              };
              listSample.push(tmp);
            })
          }
          resolve(res.data.total);
        },
        function () {}, {
          choice: nowChooseType - 1,
          page_size: that.data.pageSize,
          page_num: listSample.length/that.data.pageSize + 1
        });
    })
    request.then(function (count) {
      that.setData({
        loadingMore: false,
        noticeArray: listSample,
      });
      if (listSample.length >= count) {
        that.setData({
          finale: true
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getTabBar().init();
  },

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


});