// components/Notice/index.js
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   * @param {Number} nid 列表内编号
   * @param {Number} pid 文章pid
   * @param {Boolean} important 是否是重要通知
   * @param {Boolean} redDot 是否显示红点（未读）
   * @param {Boolean} stickTop 是否置顶
   * @param {Boolean} attachment 是否有附件
   * @param {Boolean} star 是否收藏
   * @param {String} title 通知标题
   * @param {String} category 通知分类
   * @param {String} source 通知来源
   * @param {Number} rightCellWidth 右划区域的宽度
   */
  properties: {
    nid: {
      type: Number,
      value: 0
    },
    pid: {
      type: Number,
      value: 0
    },
    important: {
      type: Boolean,
      value: false
    },
    redDot: {
      type: Boolean,
      value: false
    },
    stickTop: {
      type: Boolean,
      value: false
    },
    attachment: {
      type: Boolean,
      value: false
    },
    star: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    },
    category: {
      type: String,
      value: ""
    },
    source: {
      type: String,
      value: ""
    },
    rightCellWidth: {
      type: Number,
      value: 162
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * Notice 组件点击跳转
     * @param {object} event
     */
    onClick: function (event) {},

    /**
     * Notice 组件置顶按钮
     * @param {object} event
     */
    stickToTop: function (event) {
      console.log(this.data.nid);
      this.setData({
        stickTop: true
      });
    },

    /**
     * Notice 组件取消置顶按钮
     * @param {object} event
     */
    cancelTop: function (event) {
      this.setData({
        stickTop: false
      });
    },

    /**
     * Notice 组件标为已读按钮
     * @param {object} event
     */
    markAsRead: function (event) {
      this.setData({
        redDot: false
      });
    },

    /**
     * Notice 组件标为未读按钮
     * @param {object} event
     */
    markAsNotRead: function (event) {
      this.setData({
        redDot: true
      });
    },

    /**
     * Notice 组件删除按钮
     * @param {object} event
     */
    deleteNotice: function (event) {},

    /**
     * Notice 组件点击跳转
     * @param {object} event
     */
    navigateToDetails: function (event) {
      console.log(event);
      let data = {
        pid: this.data.pid
      };
      wx.navigateTo({
        url: "/pages/notifyDetails/index",
        success: function (res) {
          res.eventChannel.emit("acceptDataFromOpenerPage", data);
        }
      });
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    /**
     * Notice 组件 attached 生命周期，处理了过长的标题
     */
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // 处理过长的标题
      let adjustedTitle = this.data.title;
      if (adjustedTitle.length > 34) {
        adjustedTitle = adjustedTitle.substr(0, 34) + "...";
      }
      this.setData({
        title: adjustedTitle
      });
    }
  }
});
