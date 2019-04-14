const Controller = require('egg').Controller;
const createRule = {
  package_name: { type: 'string', required: true },
  // package_price: { type: 'int', required: true },
  // bar_id: 'int',
  tips: { type: 'string', default: '暂无备注', required: false },
  type: { type: 'enum', default: '普通套餐', values: [ '普通套餐' ], required: false },
  status: { type: 'enum', values: [ '使用中', '已停用' ], default: '使用中', required: false },
  total_sale_number: { type: 'int', default: 0, required: false },
  photo_id: { type: 'int', default: 0, required: false },
};

class BarController extends Controller {
  // POST
  async create() {
    // 图片上传特殊处理
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    console.log(ctx.request.body.data);
    const { package_name, bar_id } = ctx.request.body.data;
    const old = await ctx.service.package.getPackageInfo({ package_name, bar_id }, [ 'id' ]);
    if (old.length !== 0) {
      ctx.body = {
        status: 0,
        message: '本酒吧该套餐名称已经存在',
      };
    } else {
      const id = await ctx.service.package.createPackageInfo(ctx.request.body.data);
      console.log(id);
      const responseBody = {
        status: 1,
        message: '创建成功',
        data: {
          id,
        },
      };
      ctx.body = responseBody;
    }
  }
  // GET
  async show() {
    const ctx = this.ctx;
    const { attributes: attributesArray = [], filter = null } = ctx.request.body.data;
    const data = await ctx.service.package.getPackageInfo(filter, attributesArray);
    ctx.body = {
      status: data.length === 0 ? 0 : 1,
      message: data.length === 0 ? '没有符合条件的信息' : '查询成功',
      data,
    };
    ctx.status = 200;
  }
  // PUT
  async update() {
    const ctx = this.ctx;
    const { attributes: attributesObject = {}, filter = null } = ctx.request.body.data;
    const affectedRows = await ctx.service.package.updatePackageInfo(filter, { status: '已停用' });
    await ctx.service.package.createPackageInfo({ ...attributesObject, status: '使用中' });
    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }
  async destroy() {
    const ctx = this.ctx;
    const { filter = null } = ctx.request.body.data;
    const affectedRows = await ctx.service.package.updatePackageInfo(filter, { status: '已停用' });
    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }
}

module.exports = BarController;
