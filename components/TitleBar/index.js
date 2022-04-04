// components/TitleBar/index.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  /**
   * @param title the title of page
   * @param arrow true is show the back-arrow  false is not
   * @param titleStyle extra style for speciall class style
   */
  properties: {
    title: {
      type: String,
      value: "notify"
    },
    arrow: {
      // 是否显示返回箭头 默认 true
      type: Boolean,
      value: true
    },
    titleStyle: {
      type: String,
      value: ""
    }
  },
  lifetimes: {
    attached: function () {
      console.log(app.globalData.systemInfo, app.globalData.capsuleHeight);
      this.setData({
        statusBarHeight: app.globalData.systemInfo.statusBarHeight,
        capsuleHeight: app.globalData.capsuleHeight
      });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    capsuleHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * it used to go back to last page
     */
    onTapArrow() {
      // 检查当前页面栈是否多于一个页面
      if (getCurrentPages().length > 1) {
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
});
