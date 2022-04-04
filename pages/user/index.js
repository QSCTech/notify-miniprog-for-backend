// index.js
// 获取应用实例
const app = getApp();
import plugin from "../../components/Calendar2/plugins/index";
import todo from "../../components/Calendar2/plugins/todo";
import week from "../../components/Calendar2/plugins/week";

import selectable from "../../components/Calendar2/plugins/selectable";
plugin.use(todo).use(selectable).use(week);
Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false

    types: [{ img: "icon-settings", name: "对外交流", color: "#00a5e3" }],
    isChoiceFilter: false, //选择ddl 或者 收藏
    calendarConfig: {
      theme: "elegant",
      autoChoosedWhenJump: false,
      highlightToday: true,
      markToday: "今",
      multi: false,
      emphasisWeek: true,
      preventSwipe: false,
      weekMode: true,
      onlyShowCurrentMonth: false
    },
    isExpand: false //是否展开
  },

  onShow() {
    this.getTabBar().init();
    const calendar = this.selectComponent("#calendar").calendar;
    calendar.switchView("week").then(() => {});
  },
  toSettings() {
    wx.navigateTo({
      url: "/pages/user/settings/index"
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  afterTapDate(e) {
    console.log(e);
    this.setData({
      ddlYear: e.detail.year,
      ddlMonth: e.detail.month,
      ddlDate: e.detail.date
    });
  },
  whenChangeMonth(e) {
    console.log("whenChangeMonth", e.detail);
  },
  takeoverTap(e) {
    console.log("takeoverTap", e.detail);
  },
  afterCalendarRender(e) {
    console.log("afterCalendarRender", e);
    // 获取日历组件上的 calendar 对象
    // const calendar = this.selectComponent('#calendar').calendar
    // console.log('afterCalendarRender -> calendar', calendar)
    const calendar = this.selectComponent("#calendar").calendar;
    if (calendar.getSelectedDates().length === 0) {
      if (this.data.ddlYear && this.data.ddlMonth && this.data.ddlDate) {
        calendar.jump({
          year: this.data.ddlYear,
          month: this.data.ddlMonth,
          date: this.data.ddlDate
        });
        console.log(this.data.ddlYear, this.data.ddlMonth);
      }
    }
  },
  onSwipe(e) {
    console.log("onSwipe", e);
  },
  /**
   *
   */
  onclickFilter() {
    this.setData({ isChoiceFilter: !this.data.isChoiceFilter });
  },
  /**
   * 点击日历的向下向上按钮
   */
  onClickArrow() {
    const calendar = this.selectComponent("#calendar").calendar;
    var that = this;
    if (!this.data.isExpand) {
      calendar.switchView("month").then(() => {
        that.setData({ isExpand: true });
      });
    } else {
      calendar.switchView("week").then(() => {
        that.setData({ isExpand: false });
      });
    }
  }
});
