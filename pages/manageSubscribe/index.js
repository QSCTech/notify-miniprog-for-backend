import { HTTP } from "../../utils/http";

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
        index: "A",
        items: []
      },
      {
        index: "B",
        items: [ { id: 41, title: "本科生院", label: "www.animal.zju.edu.cn", isChosen: false } ]
      },
      {
        index: "C",
        items: []
      },
      {
        index: "D",
        items: [
          { id: 12, title: "丹阳青溪学园", label: "www.animal.zju.edu.cn", isChosen: false },
          { id: 3, title: "动物科学学院", label: "www.animal.zju.edu.cn", isChosen: false },
          { id: 13, title: "地球科学学院", label: "www.animal.zju.edu.cn", isChosen: false },
          { id: 15, title: "电气工程学院", label: "www.animal.zju.edu.cn", isChosen: false }
        ]
      },
      {
        index: "E",
        items: []
      },
      {
        index: "F",
        items: []
      },
      {
        index: "G",
        items: [
          { id: 18, title: "国际合作与交流处", label: "www.gonggong.com", isChosen: false },
          { id: 23, title: "光华法学院", label: "www.gonggong.com", isChosen: false },
          { id: 33, title: "光电科学与工程学院", label: "www.gonggong.com", isChosen: false },
          { id: 36, title: "高分子科学与工程学系", label: "www.gonggong.com", isChosen: false },
          { id: 38, title: "公共管理学院", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "H",
        items: [
          { id: 1, title: "航空航天学院", label: "www.gonggong.com", isChosen: false },
          { id: 8, title: "化学系", label: "www.gonggong.com", isChosen: false },
          { id: 17, title: "环境与资源学院", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "I",
        items: []
      },
      {
        index: "J",
        items: [
          { id: 4, title: "建筑工程学院", label: "www.gonggong.com", isChosen: false },
          { id: 7, title: "就业指导与服务中心", label: "www.gonggong.com", isChosen: false },
          { id: 10, title: "计算机科学与技术学院", label: "www.gonggong.com", isChosen: false },
          { id: 14, title: "经济学院", label: "www.gonggong.com", isChosen: false },
          { id: 30, title: "机械工程学院", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "K",
        items: [ { id: 11, title: "控制科学与工程学院", label: "www.animal.zju.edu.cn", isChosen: false } ]
      },
      {
        index: "L",
        items: [ { id: 22, title: "蓝田学园", label: "www.gonggong.com", isChosen: false } ]
      },
      {
        index: "M",
        items: [ { id: 27, title: "马克思主义学院", label: "www.gonggong.com", isChosen: false } ]
      },
      {
        index: "N",
        items: [ 
          { id: 2, title: "农业与生物技术学院", label: "www.gonggong.com", isChosen: false },
          { id: 16, title: "能源工程学院", label: "www.gonggong.com", isChosen: false }
         ]
      },
      {
        index: "O",
        items: []
      },
      {
        index: "P",
        items: []
      },
      {
        index: "Q",
        items: [ { id: 39, title: "求是学院", label: "www.gonggong.com", isChosen: false } ]
      },
      {
        index: "R",
        items: [ { id: 40, title: "软件学院", label: "www.gonggong.com", isChosen: false } ]
      },
      {
        index: "S",
        items: [
          { id: 5, title: "生物医学工程与仪器科学学院", label: "www.gonggong.com", isChosen: false },
          { id: 6, title: "生物系统工程与食品科学学院", label: "www.gonggong.com", isChosen: false },
          { id: 25, title: "生命科学学院", label: "www.gonggong.com", isChosen: false },
          { id: 29, title: "数学科学学院", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "T",
        items: []
      },
      {
        index: "U",
        items: []
      },
      {
        index: "V",
        items: []
      },
      {
        index: "W",
        items: [
          { id: 19, title: "外国语言文化与国际交流学院", label: "www.gonggong.com", isChosen: false },
          { id: 35, title: "物理学系", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "X",
        items: [
          { id: 20, title: "信息与电子工程学院", label: "www.gonggong.com", isChosen: false },
          { id: 21, title: "现代教学管理信息系统", label: "www.gonggong.com", isChosen: false },
          { id: 37, title: "心理与行为科学系", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "Y",
        items: [
          { id: 32, title: "医学院", label: "www.gonggong.com", isChosen: false },
          { id: 34, title: "药学院", label: "www.gonggong.com", isChosen: false }
        ]
      },
      {
        index: "Z",
        items: [
          { id: 9, title: "竺可桢学院", label: "www.gonggong.com", isChosen: false },
          { id: 24, title: "浙江大学图书馆", label: "www.gonggong.com", isChosen: false },
          { id: 26, title: "浙江大学后勤集团", label: "www.gonggong.com", isChosen: false },
          { id: 42, title: "紫云碧峰学园", label: "www.gonggong.com", isChosen: false }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
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

      let http = new HTTP();
      http._request("subscribe/all-of-user", function(res) {
        let sub = res.data.subscribes;
        let isSub = new Array(100);
        sub.forEach(function (value) {
          isSub[value.subscribe_id] = true;
        })
        that.selectComponent("#SubscribeIndex").data.websites.forEach(function(value) {
          value.items.forEach(function(item) {
            item.isChosen = isSub[item.id];
            if (isSub[item.id]) {
              console.log(that.data.websites[7].items[0].isChosen + " " + that.data.websites[7].items[0].title);
            }
          })
        }
        )
      }, function() {}, {
        page_size: 100,
        page_number: 1
      })
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
      let http = new HTTP();
      this.selectComponent("#SubscribeIndex").data.websites.forEach(function(value) {
        value.items.forEach(function(item) {
          if (item.isChosen) {
            http._request("subscribe/append", function(res) {
              console.log(res.msg);
            }, function() {}, {
              subscribe_id: item.id
            })
          }
        })
      })
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
