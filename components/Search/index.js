// components/Search/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: "shared"
  },
  /**
   * componentType =0 means we at index page  =1 means we at search page
   * isChoiceFilter=false means we don't click filter button
   * type1Value   type=1时候的值
   * type2Value   type=2时候的值
   * disabled  是否禁止聚焦
   */
  properties: {
    componentType: {
      type: Number,
      value: 0
    },
    isChoiceFilter: {
      type: Number,
      value: 0
    },
    type1Value: {
      type: String,
      value: ""
    },
    type2Value: {
      type: String,
      value: ""
    },
    disabled: {
      type: Boolean,
      value: false
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
     * if we click filter button, it will trigger a thing to change the filter
     */
    onclickFilter(e) {
      console.log("click filter");
      this.triggerEvent("clickfilter", e.target.dataset.sid);
      return;
    },
    /**
     * in the index page, when we get the focus of the search, we navigateTo search page
     */
    goToSearch() {
      wx.navigateTo({
        url: "/pages/index/search/index"
      });
    },
    onType1Search() {
      var myEventDetail = { value: this.data.type1Value }; // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent("search1", myEventDetail, myEventOption);
      console.log("当前type为1，搜索的string 为", this.data.type1Value);
      this.triggerEvent("search", { value: this.data.type1Value });
    },
    handleType1Change: function (e) {
      console.log("输入发生变化为", e.detail);
      this.setData({
        type1Value: e.detail.value
      });
    },
    handleType2Change: function (e) {
      console.log("输入发生变化为", e.detail);
      this.setData({
        type2Value: e.detail.value
      });
    },
    onTypeWrap() {
      console.log("点击搜索框");
      this.triggerEvent("wrap", {}, {});
    },
    onType2Search() {
      var myEventDetail = {}; // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent("search2", myEventDetail, myEventOption);
      console.log("当前type为2，搜索的string 为", this.data.type2Value);
    },

    onclickXButton() {
      console.log(getCurrentPages());
      console.log("click back button");
      if (getCurrentPages().length > 1) {
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
});
