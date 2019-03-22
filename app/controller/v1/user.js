const Controller = require('egg').Controller;
/*
接口格式
{
  status: 0,
  message: "",
  data: {
    ...
  }
}
*/
const createRule = {
  username: 'string',
  phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/ },
  phone_for_message: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/ },
  idcard: { type: 'string', max: 18, min: 18 },
  user_type: { type: 'enum', values: [ '管理员', '区域经理', '客服人员', '销售员' ] },
  bar_id: 'string',
};

class UserController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    const check = await ctx.service.user.getUserInfo({ phone: ctx.request.body.data.phone }, [ 'id' ]);
    if (check.length === 0) {
      const id = await ctx.service.user.createUserinfo(ctx.request.body.data);
      const responseBody = {
        status: 1,
        message: '创建成功',
        data: {
          id,
        },
      };
      ctx.body = responseBody;
      ctx.status = 200;
    } else {
      const responseBody = {
        status: 0,
        message: '创建失败，该手机号已经被使用',
      };
      ctx.body = responseBody;
      ctx.status = 200;
    }
  }
  // GET
  /*
  queries{
    attrbutes:[],
    name: 'weixiang',
    phone: '15301660251'
  }
  */
  async show() {
    const ctx = this.ctx;
    const attributesArray = ctx.queries.attributes || [];
    delete ctx.queries.attributes;// 去掉queries属性
    const filter = { ...ctx.queries };
    const data = await ctx.service.user.getUserInfo(filter, attributesArray);
    ctx.body = {
      status: 1,
      data,
    };
    ctx.status = 200;
  }
  // PUT
  async update() {
    const ctx = this.ctx;
    const attributesObject = ctx.body.data.attributes || [];
    const filter = ctx.body.data.filter;
    const affectedRows = await ctx.service.user.updateUserinfo(filter, attributesObject);

    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }

  }
  async destroy() {
    const ctx = this.ctx;
    const attributesObject = { status: '禁止登录' };
    const filter = ctx.body.data.filter;
    const affectedRows = await ctx.service.user.updateUserinfo(filter, attributesObject);
    ctx.body = { status: 1, data: affectedRows };
    ctx.status = 200;
  }

}

module.exports = UserController;
