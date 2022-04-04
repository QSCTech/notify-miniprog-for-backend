Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    date: "",
    show: false,
    //用于标记今天
    formatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      let today = new Date();

      if (month === today.getMonth() + 1) {
        if (date === today.getDate()) {
          day.bottomInfo = "今天";
        }
      }
      return day;
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onDisplay() {
      this.setData({ show: true });
    },

    onClose() {
      this.setData({ show: false });
    },

    formatDate(date) {
      date = new Date(date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    /**
     * 选完日期后返回 月/日
     */
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail)
      });
    }
  }
});
