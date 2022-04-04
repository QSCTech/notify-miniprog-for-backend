// pages/login/index.js
import {
  HTTP
} from '../../utils/http';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkboxChecked: false,
    inputCaption: [{
        captionFontSize: 32,
        borderWidth: 4,
        marginTop: 4
      },
      {
        captionFontSize: 32,
        borderWidth: 4,
        marginTop: 4
      }
    ],
    isQSCer: false,
    code: ""
  },

  /**
   * 改变单选框
   */
  onCheckboxChange: function (event) {
    this.setData({
      checkboxChecked: event.detail
    });
  },

  /**
   * 输入框聚焦时
   */
  inputFocus(event) {
    let id = event.target.dataset.tid;
    let newInputCaption = this.data.inputCaption;
    newInputCaption[id].captionFontSize = 26;
    newInputCaption[id].borderWidth = 6;
    newInputCaption[id].marginTop = 2;
    this.setData({
      inputCaption: newInputCaption
    });
  },

  /**
   * 输入框失去聚焦时
   */
  inputBlur(event) {
    let id = event.target.dataset.tid;
    let newInputCaption = this.data.inputCaption;
    newInputCaption[id].captionFontSize = 32;
    newInputCaption[id].borderWidth = 4;
    newInputCaption[id].marginTop = 4;
    this.setData({
      inputCaption: newInputCaption
    });
  },

  /**
   * 查看协议
   */
  viewContract(event) {
    wx.navigateTo({
      url: "contract/index"
    });
  },

  /**
   * 提交表单
   */
  formSubmit: function (event) {
    let ID = event.detail.value.ID;
    let passwd = event.detail.value.passwd;
    let bbsPassword = event.detail.value.bbsPassword;
    let agreement = event.detail.value.agreement;
    if (!agreement) {
      wx.showToast({
        icon: 'none',
        title: '请先勾选同意《服务协议》《隐私条款》',
      })
    } else if (!this.data.isQSCer) {
      if (ID == '' || passwd == '') {
        wx.showToast({
          icon: 'none',
          title: '请输入学号及密码',
        })
      } else {
          const http = new HTTP();
          http._request('user/login', function (res) {
            if (res.code == 500) {
              wx.showToast({
                icon: 'none',
                title: '用户不存在或密码错误',
              })
              return;
            }
              wx.setStorageSync("token", res.data.token);
              wx.switchTab({
                url: "/pages/index/index",
                success(res) {
                  let page = getCurrentPages().pop();
                  if (page == undefined || page == null) {
                    return;
                  }
                  page.onLoad();
                }
              });
            },
            function () {}, {
              stu_id: ID,
              password: passwd,
              wx_login_code: this.data.code
            }, 'POST');
        }
      } else {
        if (ID == '' || passwd == '' || bbsPassword == '') {
          wx.showToast({
            icon: 'none',
            title: '请输入学号及密码',
          })
        } else {
          const http = new HTTP();
          http._request('user/login', function (res) {
            if (res.code == 500) {
              wx.showToast({
                icon: 'none',
                title: '用户不存在或密码错误',
              })
              return;
            }
            console.log("true" + res.data.token);
            wx.setStorageSync('token', res.data.token);
            console.log("token" + wx.getStorageSync('token'));
            wx.switchTab({
              url: "/pages/index/index",
              success(res) {
                let page = getCurrentPages().pop();
                if (page == undefined || page == null) {
                  return;
                }
                page.onLoad();
              }
            });
          }, function () {}, {
            stu_id: '3200101178',
            password: 'Danny@...',
            bbs_password: 'Danny@...',
            wx_login_code: this.data.code
          }, 'POST');
        }
    }
  },

  /**
   * 切换后台密码输入界面
   */
  handleQSCer: function () {
    this.setData({
      isQSCer: !this.data.isQSCer
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

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