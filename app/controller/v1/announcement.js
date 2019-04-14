const Controller = require('egg').Controller;
const createRule = {
  // barid: { type: INTEGER },
  visible_user_type: { type: 'enum', values: [ '门店客服', '销售员', '所有人' ], required: true },
  content: 'string',
  // creater_id: 'int',
};

class AnnouncementController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    console.log(ctx.request.body.data);
    const id = await ctx.service.announcement.createAnnounceInfo(ctx.request.body.data);
    const responseBody = {
      status: 1,
      message: '创建成功',
      data: {
        id,
      },
    };
    ctx.body = responseBody;

  }
  // GET
  async show() {
    const ctx = this.ctx;
    const { attributes: attributesArray = [], filter = null } = ctx.request.body.data;
    const data = await ctx.service.announcement.getAnnounceInfo(filter, attributesArray);
    ctx.body = {
      status: data.length === 0 ? 0 : 1,
      message: data.length === 0 ? '没有符合条件的信息' : '查询成功',
      data,
    };
    ctx.status = 200;
  }
  // PUT 通知不应该有修改行为
  async update() {
    const ctx = this.ctx;
    ctx.body = { status: 0, message: '不存在要修改的列' };
  }
  async destroy() {
    const ctx = this.ctx;
    ctx.body = { status: 0, message: '不存在要修改的列' };
  }
}

module.exports = AnnouncementController;
