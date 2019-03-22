const Controller = require('egg').Controller;
const createRule = {
  package_name: { type: 'string', required: true },
  package_price: 'int',
  tips: { type: 'string', default: '暂无备注' },
  type: { type: 'enum', default: '普通套餐', values: [ '普通套餐' ] },
  status: { type: 'enum', values: [ '使用中', '已停用' ] },
  total_sale_number: 'int',
  created_time: 'dateTime',
  changed_time: 'dateTime',
  photo_id: 'int',
};

class BarController extends Controller {
  // POST
  async create() {
    // 图片上传特殊处理
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    const id = await ctx.service.user.createPackageInfo(ctx.request.body.data);
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
    const data = await ctx.service.user.getPackageInfo(filter, attributesArray);
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
    const affectedRows = await ctx.service.user.updatePackageinfo(filter, attributesObject);

    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }

}

module.exports = BarController;
