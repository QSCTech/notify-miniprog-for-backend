// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   *
   */
  properties: {},
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   * @param {Number} active - the nowselect tab
   * @param {Object}  tabBarItemList - the tab-bar item
   * @param {Number} notifyNumber the number of red dot show
   */
  data: {
    active: 0,
    notifyNumber: 0,
    tabBarItemList: [
      {
        text: "通知",
        url: "/pages/index/index"
      },
      {
        text: "信息库",
        url: "/pages/infoBase/index"
      },
      {
        text: "个人",
        url: "/pages/user/index"
      }
    ]
  },

  /**
   * 组件的方法列表
   */

  methods: {
    /**
     * onChange is used to change tabBar component actived
     * @param {Object} event - the js event
     */
    onChange(event) {
      this.setData({ active: event.detail });
      console.log(this.data.tabBarItemList[event.detail].url);
      wx.switchTab({
        url: this.data.tabBarItemList[event.detail].url
      });
    },
    /**
     * init is used in onShow lifetime of all tabBar pages
     */
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.tabBarItemList.findIndex(
          (item) => item.url === `/${page.route}`
        )
      });
    },
    /**
     * changeNotifyNumber is used to change the number of red pot!
     * @param {Number} number
     */
    changeNotifyNumber(number = 0) {
      console.log("改变传入的notifyNumber为", number);
      this.setData({ notifyNumber: number });
    }
  }
});
