// pages/notifyDetails/index.js
const app = getApp();
import plugin from "../../components/Calendar2/plugins/index";
import todo from "../../components/Calendar2/plugins/todo";
import selectable from "../../components/Calendar2/plugins/selectable";
import {
  HTTP
} from "../../utils/http";
plugin.use(todo).use(selectable);
const hour = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23"
];
const minute = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59"
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      theme: "elegant",
      autoChoosedWhenJump: false,
      highlightToday: true,
      markToday: "今",
      multi: false,
      emphasisWeek: true,
      preventSwipe: false,
      onlyShowCurrentMonth: false,
      disableMode: {
        // 禁用某一天之前/之后的所有日期
        type: "before", // [‘before’, 'after']
        date: false // 无该属性或该属性值为假，则默认为当天
      }
    },
    scrollViewHeight: 0,
    safeAreaHeight: 0,
    pid: 0,
    title: "2020-2021学年春夏学期浙江大学本科生英语水平测试报名通知",
    date: "2021年03月17日",
    visits: 9622,
    category: "重要通知",
    source: "通识教育中心",
    text: "各位同学：<br/>    2020-2021学年春夏学期浙江大学英语水平测试将于近日启动，英语水平测试由听力阅读、写作、口试组成，现将相关事项通知如下。<br/>    <br/>    一、听力阅读与写作部分考试安排<br/>    1.考试时间与形式<br/>    2021年4月10日（周六晚上）和4月11日（周日全天），采用机考形式进行听力阅读与写作部分的测试。<br/>    <br/>    2.面向对象<br/>    2019级、2018级、2017级及其他高年级在校毕业班学生、结业生。<br/>    <br/>    3.报名时间与网址<br/>    报名时间：2021年3月19日（周五）9:00至2021年4月2日（周五）24:00。<br/>    报名地址：现代教务管理系统——考试与成绩——英语水平测试报名（http://jwbinfosys.zju.edu.cn/default2.aspx），请考生在网上选择参加考试的日期和场次。<br/>    逾期未报名同学，视为自动放弃本次考试，系统不接收补报名。<br/>    <br/>    4.考试具体时间和地点查询<br/>    4月8日（周四）起，登陆现代教务管理系统查询机考的具体时间和教室。<br/>    <br/>    5.考试成绩查询<br/>    请考生在参加机考两周后（4月26日起）上网查询考试成绩。<br/>    若考生未通过听力阅读或写作中的任何一项，请在准备充分后，重新报名参加以后举行的机考。<br/>    <br/>    二、口试安排<br/>    口语考试拟定于2021年5月15-16日（周六、周日）进行，计划于4月底开放报名。具体报名时间另行通知。<br/>    注意：只有听力阅读和写作两项考试均通过的同学（含往届两项考试均通过者）方有资格报名口语考试。<br/>    <br/>    三、考务须知<br/>    考试签到：请务必提前二十分钟到达考试教室。考试前五分钟停止入场。<br/>    有效证件：请考生务必携带有效证件（身份证或者学生证，照片必须清晰）参加考试。<br/>    其他事项：机考不必带耳机。因迟到等原因未能在报名场次参加考试的同学，一律不安排其他场次的考试。<br/>    <br/>    四、其他<br/>    按照《浙江大学本科生“外语类”课程修读管理办法》（浙大本发[2018]14号）文件精神，除有条件替代外，本科生必须通过外语类水平测试，通过测试后获得1学分。未能获得此1学分的，将不能按时通过毕业资格审核。具体替代要求，请参阅附件《浙江大学本科生“外语类课程修读管理办法”（2018年4月修订）》。<br/>    其他相关重要信息请参阅附件《浙江大学英语水平考试大纲》和《浙江大学英语水平考试实施方案》。<br/>    考试期间，请按学校防疫要求，做好个人防护。如因不可抗力因素影响，考试如有调整，请及时关注学校通知。<br/>    <br/>    五、咨询电话<br/>    外语学院本科与继续教育科 88206256<br/>    教务处通识教育中心  88206095  ",
    important: true,
    star: false,
    hasAttachment: true,
    attachment: "附件1：浙大本发〔2018〕14号+浙江大学本科生“外语类”课程修读管理办法<br/>    附件2：“浙江大学英语水平测试”大纲<br/>    附件3：浙江大学“英语水平考试”实施方案(更新）<br/>    附件4：浙江大学英语水平考试样卷（含听力音频）",
    origin: "https://webplus.zju.edu.cn/tsjy/2021/0317/c50038a2268777/page.psp",
    reportBtnStatus: false, // 报错按钮状态。为false表示收起，为true表示展开
    showDate: false, //是否打开遮罩
    showTime: false, //是否遮罩内选择时间
    pickerData: [{
        values: ["上午", "下午"],
        defaultIndex: 0
      },
      {
        values: hour,
        defaultIndex: 9
      },
      {
        values: minute,
        defaultIndex: 0
      }
    ],
    ddlYear: null,
    ddlMonth: null,
    ddlDate: null,
    ddlHour: null,
    ddlMinute: null,
    ddlTime: "09:00",
    ddlMsg: null
  },

  onclickText: function () {
    this.setData({
      reportBtnStatus: false
    });
  },

  onclickReport: function () {
    if (this.data.reportBtnStatus == false) {
      this.setData({
        reportBtnStatus: !this.data.reportBtnStatus
      });
    } else {
      //
    }
  },

  /**
   * 展示  or  隐藏日历选择
   */
  onChangeDate: function () {
    this.setData({
      showDate: !this.data.showDate
    });
  },
  /**
   * 时间选择 和 日期选择切换
   */
  onChangeTIme: function () {
    this.setData({
      showTime: !this.data.showTime
    });
  },
  /**
   * 按下取消按钮
   */
  onClickCancel: function () {
    if (this.data.showTime && this.data.showDate) {
      this.setData({
        showTime: false
      });
      return;
    }
    if (this.data.showDate) {
      this.setData({
        showDate: false
      });
      return;
    }
  },

dateFormat: function(fmt, date) {
  let ret,
  opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": date.getMonth().toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
},

  /**
   * 按下确认按钮
   */
  onClickConfirm: function () {
    if (this.data.showTime) {
      //如果是在选择时间
      let picker = this.selectComponent("#picker");
      if (picker != null) {
        let chooseTimes = picker.getValues();
        console.log(chooseTimes);
        this.setData({
          showTime: false,
          ddlHour: chooseTimes[1],
          ddlMinute: chooseTimes[2],
          ddlTime: chooseTimes[1] + ":" + chooseTimes[2]
        });
        return;
      } else {
        wx.showToast({
          title: "发生未知错误",
          icon: "error"
        });
        this.setData({
          showTime: false
        });
        return;
      }
    } else {
      //提交数据
      if (!(this.data.ddlYear && this.data.ddlMonth && this.data.ddlDate)) {
        wx.showModal({
          showCancel: false,
          title: "错误",
          content: "请选择日期",
          confirmText: "确定",
          success: function () {}
        });
        return;
      } else {
        let http = new HTTP();
        let url = "notice/set/ddl?notice_id=" + this.data.pid;
        http._request(url, function(res){
        }, function() {}, {
          // ddl_time: "2022-01-19 12:30:00",
          // ddl_time: new Date(this.data.ddlYear, this.data.ddlMonth, this.data.ddlDate, this.data.ddlHour, this.data.ddlMinute),
          ddl_time: this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(this.data.ddlYear, this.data.ddlMonth, this.data.ddlDate, this.data.ddlHour, this.data.ddlMinute)),
          ddl_msg: "这是一条ddl"
        }, "POST")
        console.log(
          this.data.ddlYear,
          this.data.ddlMonth,
          this.data.ddlDate,
          this.data.ddlHour,
          this.data.ddlMinute
        );
      }
    }
  },
  onSetDate: function (e) {
    console.log(e);
  },

  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    const http = new HTTP();
    const that = this;
    eventChannel.on("acceptDataFromOpenerPage", function (data) {
      const pid = data.pid;
      http._request('notice/get/detail', function (res) {
        if (res.status === "error") {
          wx.showModal({
            title: "Opps!",
            content: res.description,
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        } else {
          let data = res.data.detail;
          if (data.has_ddl) {
            let msg = data.ddl.ddl_msg;
            let t = new Date(data.ddl.ddl_time);
            that.setData({
              ddlDate: t.getDate(),
              ddlMonth: t.getMonth() + 1,
              ddlYear: t.getFullYear(),
              ddlTime: t.getHours() + ":" + t.getMinutes(),
              ddlMsg: msg
            })
          } 
          that.setData({
            pid: pid,
            title: data.title,
            // visits: res.data.notify_visit_number,
            category: data.category,
            source: data.from_faculty,
            text: data.content,
            important: data.is_settop,
            star: data.is_collect,
            hasAttachment: data.appendixes.length > 0,
            attachment: data.appendixes,
            origin: data.url
          })
        }
      }, function () {}, {
        notice_id: pid
      });
    });
    let safeAreaHeight =
      app.globalData.systemInfo.windowHeight -
      app.globalData.systemInfo.safeArea.bottom;
    let scrollHeight =
      app.globalData.systemInfo.safeArea.bottom -
      app.globalData.systemInfo.safeArea.top -
      app.globalData.capsuleHeight -
      44;

    this.setData({
      scrollViewHeight: scrollHeight,
      safeAreaHeight: safeAreaHeight
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
   * 用户点击底部工具栏
   */
  onToolBarChange: function (event) {
    console.log(event.detail);
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
  }
});