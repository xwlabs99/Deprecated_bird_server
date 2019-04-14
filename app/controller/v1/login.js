const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

const createRule = {
  username: { type: 'string', required: true },
  phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/, required: true },
  phone_for_message: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/, required: true },
  // password: { type: 'string' },
  idcard: { type: 'string' },
  // bar_id: { type: 'int', required: true },
  user_type: { type: 'enum', values: [ '管理员', '区域经理', '门店客服', '销售员' ] },
};
class LoginController extends Controller {
  // POST
  async login() {
    const ctx = this.ctx;
    const { phone } = ctx.request.body.data;
    const password = ctx.helper.md5(ctx.request.body.data.password);
    const loginInfo = await ctx.service.login.getLoginInfo({
      phone,
      password,
    }, [ 'userinfo_id', 'password' ]);

    if (loginInfo === null) {
      ctx.body = {
        status: 0,
        message: '用户名或密码错误',
      };
    } else {
      const [ userInfo ] = await ctx.service.user.getUserInfo({ id: loginInfo.userinfo_id }, [ 'id', 'username', 'phone', 'phone_for_message', 'status', 'user_type', 'bar_id' ]);
      const [ barInfo ] = await ctx.service.bar.getBarInfo({ id: userInfo.bar_id }, [ 'bar_name' ]);
      const token = jwt.sign({ ...userInfo, password }, this.app.config.jwtKey);
      if (userInfo.status === '审核中') {
        ctx.body = {
          status: 0,
          message: '账号正在审核中',
        };
      } else {
        ctx.body = {
          status: 1,
          message: '登录成功',
          data: { token, ...userInfo, ...barInfo },
        };
      }
    }
    // 登录
  }

  async register() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    const { phone } = ctx.request.body.data;
    ctx.validate(createRule, ctx.request.body.data);
    const checkSame = await ctx.service.user.getUserInfo({ phone }, [ 'id' ]);
    console.log(checkSame);
    if (checkSame.length !== 0) {
      ctx.body = {
        status: 0,
        message: '该手机号已经被注册！',
      };
    } else {
      ctx.body = {
        status: 1,
        message: '注册成功！请等待审核',
        data: {
          id: await ctx.service.user.createUserInfo(ctx.request.body.data),
        },
      };
    }
  }
  async loginByJWT() {
    const ctx = this.ctx;
    // console.log(ctx.query);
    const decode = await ctx.helper.JWTverify(ctx.query.jwt, ctx.app.config.jwtKey);
    if (decode === null) {
      ctx.body = {
        status: 0,
        message: '身份认证出错,请重新登录',
      };
    } else {
      console.log(decode);
      const loginInfo = await ctx.service.login.getLoginInfo({
        phone: decode.phone,
        password: decode.password,
      }, [ 'userinfo_id' ]);
      if (loginInfo === null) {
        ctx.body = {
          status: 0,
          message: '身份认证出错,请重新登录',
        };
      } else {
        ctx.body = {
          status: 1,
          message: '登录成功',
        };
      }
    }
  }
  async changePassword() {
    const ctx = this.ctx;
    const { userinfo_id, oldPassword, newPassword } = ctx.request.body.data;
    const password = ctx.helper.md5(oldPassword);
    const newPswd = ctx.helper.md5(newPassword);
    const loginInfo = await ctx.service.login.getLoginInfo({
      userinfo_id,
      password,
    }, [ 'id' ]);
    if (loginInfo === null) {
      ctx.body = {
        status: 0,
        message: '原密码错误',
      };
    } else {
      await ctx.service.login.updateLogininfo({ id: loginInfo.id }, { password: newPswd });
      ctx.body = {
        status: 1,
        message: '修改成功',
      };
    }
  }
}

module.exports = LoginController;
