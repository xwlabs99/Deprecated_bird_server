const Controller = require('egg').Controller;
const createRule = {
  key1: 'string',
  value1: 'string',
  key2: 'string',
  value2: 'string',
  path: 'string',
};

class ImageController extends Controller {
  // POST
  async create() {
    // 图片上传特殊处理
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    const id = await ctx.service.user.createImageInfo(ctx.request.body.data);
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
    const data = await ctx.service.user.getImageInfo(filter, attributesArray);
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
    const attributesObject = ctx.body.data.attributes || [];
    const filter = ctx.body.data.filter;
    const affectedRows = await ctx.service.user.updateImageinfo(filter, attributesObject);

    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }

}

module.exports = ImageController;
