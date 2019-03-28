const Controller = require('egg').Controller;
const crypto = require('crypto');
const createRule = {
  username: { type: 'string', required: true },
  customer_phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/, required: true },
  phone_for_message: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/, required: true },
  password: { type: 'string' },
  idcard: { type: 'string', min: 18, max: 18 },
  bar_id: { type: 'int' },
};
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
    ctx.body = {
      status: 1,
      message: '登陆成功',
      data: info,
    };
    ctx.status = 200;
  }

  async register() {
    const ctx = this.ctx;
    const { phone, name, password } = ctx;
    const salt = '(!%&88hsdh@qo*)#ausshds9';
    const md5 = crypto.createHash('md5');
    const md5_password = md5.update(password + salt).digest('hex');
    
    
  }
}

module.exports = LoginController;
