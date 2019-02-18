'use strict';

const Controller = require('egg').Controller;
const createRule = {
  username: 'string',
  phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/ },
  phone_for_message: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/ },
  idcard: { type: 'string', max: 18, min: 18 },
  user_type: { type: 'enum', values: [ '管理员', '区域经理', '客服人员', '销售员' ] },
  bar_id: 'string',
};
class UserController extends Controller {
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const id = await ctx.service.user.createUserinfo(ctx.request.body);
    console.log(id);
    const responseBody = {
      status: 1,
      data: {
        id: 1,
      },
    };
    ctx.body = responseBody;
    ctx.status = 200;
  }
  async show() {
    const ctx = this.ctx;
    const attributesArray = [ 'username', 'created_time' ];
    const data = await ctx.service.user.getUserInfo({ id: 1 }, attributesArray);
    ctx.body = data;
    ctx.status = 200;
  }
  async update() {
    const ctx = this.ctx;
    const attributesObject = { username: 'helloworld' };
    const data = await ctx.service.user.updateUserinfo({ id: 1 }, attributesObject);
    ctx.body = data;
    ctx.status = 200;
  }
  async destroy() {
    const ctx = this.ctx;
    const attributesObject = { status: '禁止登录' };
    const data = await ctx.service.user.updateUserinfo({ id: 1 }, attributesObject);
    ctx.body = data;
    ctx.status = 200;
  }

}

module.exports = UserController;
