const Controller = require('egg').Controller;
const createRule = {
  bar_name: 'string',
  province: 'string',
  city: 'string',
  area: { type: 'string', required: false },
  tips: 'string',
  type: { type: 'enum', values: [ '普通酒吧', '测试酒吧' ] },
  status: { type: 'enum', values: [ '未开放', '运营中', '已停用' ] },
};

class BarController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.request.body.data.tips = ctx.request.body.data.tips || '无';
    ctx.validate(createRule, ctx.request.body.data);
    const { province, city, bar_name } = ctx.request.body.data;
    const old = await ctx.service.bar.getBarInfo({ province, city, bar_name }, [ 'id' ]);
    console.log(old.length);
    if (old.length !== 0) {
      ctx.body = {
        status: 0,
        message: '本地区该酒吧名称已经存在',
      };
    } else {
      const id = await ctx.service.bar.createBarInfo(ctx.request.body.data);
      ctx.body = {
        status: 1,
        message: '创建成功',
        data: {
          id,
        },
      };
    }
  }
  // GET
  async show() {
    const ctx = this.ctx;
    const { attributes: attributesArray = [], filter = null } = ctx.request.body.data;
    const data = await ctx.service.bar.getBarInfo(filter, attributesArray);
    ctx.body = {
      status: data.length === 0 ? 0 : 1,
      message: data.length === 0 ? '没有符合条件的信息' : '',
      data,
    };
    ctx.status = 200;
  }
  // PUT
  async update() {
    const ctx = this.ctx;
    const { attributes: attributesObject = {}, filter = null } = ctx.request.body.data;
    const affectedRows = await ctx.service.bar.updateUserinfo(filter, attributesObject);
    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }

  }
  async destroy() {
    const ctx = this.ctx;
    ctx.body = { status: 0, message: '不存在要修改的列' };
  }
}

module.exports = BarController;
