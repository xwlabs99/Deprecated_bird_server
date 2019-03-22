const Controller = require('egg').Controller;


class LoginController extends Controller {
  // POST
  async login() {
    const ctx = this.ctx;
    const { phone, password } = this.ctx.request.body.data;
    const info = ctx.service.login.getLoginInfo({
      phone,
      password,
    });
    // 登录
    ctx.body = { };
    ctx.status = 200;
  }
}

module.exports = LoginController;
