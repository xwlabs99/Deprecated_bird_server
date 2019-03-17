const Controller = require('egg').Controller;
const createRule = {
  id: 'int',
  bar_name: 'string',
  location: 'string',
  tips: 'string',
  type: { type: 'enum', values: [ '普通酒吧', '测试酒吧' ] },
  status: { type: 'enum', values: [ '未开放', '运营中', '已停用' ] },
};

class UserController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.request.body.data.tips = ctx.request.body.data.tips || '无';
    ctx.validate(createRule, ctx.request.body.data);
    const id = await ctx.service.user.createUserinfo(ctx.request.body.data);
    console.log(id);
    const responseBody = {
      status: 1,
      message: '创建成功',
      data: {
        id,
      },
    };
    ctx.body = responseBody;
    ctx.status = 200;
  }
  // GET
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
    ctx.body = affectedRows;
    ctx.status = 200;
  }

}

module.exports = UserController;
