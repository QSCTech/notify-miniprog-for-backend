import { HTTP } from "../utils/http";

class TokenModel extends HTTP {
  /**
   * url: token/login
   * 用于默认的小程序微信登录
   * @param {string} account 账号
   * @param {string} secret 密码
   */
  static async userLogin (account, secret) {
    return await this.prototype.request({
      url: 'token/login',
      method: 'POST',
      data: {
        type: 100,
        account: account,
        secret: secret
      },
    })
  }

  /**
   * url: token/logout
   * 用户登出
   */
  static async userLogout () {
    return await this.prototype.request({
      url: 'token/logout',
      method: 'POST'
    })
  }

  /**
   * url: token/verify
   * 正常情况下，请求 API 接口时会自动判断 Token 令牌是否合法，如果前端开发人员需要手动校验某个 Token 令牌是否合法，可以调用此接口，此接口会返回该 Token 是否合法。注意status的设置 令牌合法是true，令牌违法则status为false。
   * @param {string} token 令牌
   */
  async verifyToken (token) {
    return await this.prototype.request({
      url: 'token/verify',
      method: 'POST',
      data: {
        token: token
      },
    })
  }

  /**
   * url: token/refresh
   * 用户登出
   */
  static async refreshToken () {
    return await this.prototype.request({
      url: 'token/refresh',
      method: 'POST'
    })
  }
}

export { TokenModel };
