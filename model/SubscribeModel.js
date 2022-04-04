import { HTTP } from "../utils/http";

class SubscribeModel extends HTTP {
  /**
   * url: order/list
   * 获取所有的订阅信息
   * @param {number} offset 偏移，默认0
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async getAllSubscribe(offset = 0, count = -1) {
    return await this.prototype.request({
      url: "order/list",
      method: "GET",
      data: {
        offset: offset,
        count: count
      }
    })
  }

  /**
   * url: order/listmy
   * 获取用户的订阅信息
   * @param {number} offset 偏移，默认0
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async getMySubscribe(offset = 0, count = -1) {
    return await this.prototype.request({
      url: "order/listmy",
      method: "GET",
      data: {
        offset: offset,
        count: count
      }
    })
  }

  /**
   * url: order/add
   * 增加用户的订阅
   * @param {array} add_order_list list内为order的key
   */
  static async addSubscribe(add_order_list) {
    return await this.prototype.request({
      url: "order/add",
      method: "POST",
      data: {
        add_order_list: add_order_list
      }
    })
  }

  /**
   * url: order/delete
   * 删除用户的订阅
   * @param {array} delete_order_list list内为order的key
   */
  static async deleteSubscribe(delete_order_list) {
    return await this.prototype.request({
      url: "order/delete",
      method: "POST",
      data: {
        delete_order_list: delete_order_list
      }
    })
  }

  /**
   * url: order/new
   * 完全替换用户的订阅
   * @param {array} new_order_list list内为order的key
   */
  static async renewSubscribe(new_order_list) {
    return await this.prototype.request({
      url: "order/new",
      method: "POST",
      data: {
        new_order_list: new_order_list
      }
    })
  }
}

export { SubscribeModel };