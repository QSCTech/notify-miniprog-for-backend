// components/SubscribeIndex/SubscribeIndex.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    height: {
      type: Number,
      value: 0
    },
    topHeight: {
      type: Number,
      value: 0
    },
    websites: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showedWebsites: [],
    choiceFilter: false,
    nowChooseType: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 选中该网站
     * @param {object} e - event of click
     */
    choose(e) {
      let idSet = e.target.dataset;
      let tmp = this.data.showedWebsites;
      tmp[idSet.outerid].items[idSet.innerid].isChosen = true;
      this.setData({
        showedWebsites: tmp
      });
    },
    /**
     * 取消选中该网站
     * @param {object} e - event of click
     */
    unChoose(e) {
      let idSet = e.target.dataset;
      let tmp = this.data.showedWebsites;
      tmp[idSet.outerid].items[idSet.innerid].isChosen = false;
      this.setData({
        showedWebsites: tmp
      });
    },
    /**
     * 更改是否展示筛选
     */
    onClickFilter() {
      if (this.data.choiceFilter) {
        this.setData({
          showedWebsites: this.data.websites
        });
      } else {
        this.showChosen();
      }
      this.setData({ choiceFilter: !this.data.choiceFilter });
    },
    /**
     * 字符串搜索websites
     */
    search(searchValue) {
      // console.log(this.selectComponent("#search").data.type2Value);
      // let searchValue = this.selectComponent("#search").data.type2Value;
      let tmp = this.data.websites;
      tmp = tmp.map((current) => {
        let tmpArray = current.items;
        tmpArray = tmpArray.filter((item) => {
          if (item.title.indexOf(searchValue) >= 0) {
            return 1;
          } else {
            return 0;
          }
        });
        //上面去除字符串不匹配的
        return {
          index: current.index,
          items: tmpArray
        };
      });
      tmp = tmp.filter((current) => {
        return current.items.length > 0 ? 1 : 0;
      });
      console.log(tmp);
      this.setData({
        showedWebsites: tmp
      });
    },

    /**
     * 展示所有选中的
     */
    showChosen() {
      let tmp = this.data.websites;
      tmp = tmp.map((current) => {
        let tmpArray = current.items;
        tmpArray = tmpArray.filter((item) => {
          if (item.isChosen) {
            return 1;
          } else {
            return 0;
          }
        });
        //上面去除未选中的
        return {
          index: current.index,
          items: tmpArray
        };
      });
      tmp = tmp.filter((current) => {
        return current.items.length > 0 ? 1 : 0;
      });
      console.log(tmp);
      this.setData({
        showedWebsites: tmp
      });
    }
  },

  lifetimes: {
    /**
     * 组件被挂载时执行
     */
    attached() {
      this.setData({
        showedWebsites: this.data.websites
      });
    }
  }
});
