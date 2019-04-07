const Controller = require('egg').Controller;
const createRule = {
  order_photo_id: 'int',
  order_type: { type: 'enum', values: [ '预定单', '正价', '套餐', '自来客' ] },
  requireType: { type: 'enum', values: [ '卡座', '吧台', '包房', '散台' ] },
  order_status: { type: 'enum', values: [ '预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消', '待修改', '已修改' ] },
  pay_method: { type: 'enum', values: [ '线上购买', '线下购买' ] },
  number: 'int',
  customer_name: 'string',
  customer_sex: { type: 'enum', values: [ '男', '女' ] },
  customer_phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/ },
  tips: { type: 'string', default: '暂无备注' },
  is_phoned: { type: 'enum', values: [ '是', '否' ] },
  is_arrived: { type: 'enum', values: [ '是', '否' ] },
  package_id: 'int',
  consumption: 'int',
  bar_id: 'int',
  creater_id: 'int',
  saleperson_id: 'int',
  created_time: 'dateTime',
  accepted_time: 'dateTime',
  followed_time: 'dateTime',
  finished_time: 'dateTime',
  is_gootfeedback: { type: 'enum', values: [ '是', '否' ] },
  customer_comment: 'string',
  comment_tips: 'string',
};

class OrderController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    const id = await ctx.service.user.createOrderInfo(ctx.request.body.data);
    console.log(id);
    const responseBody = {
      status: 1,
      message: '订单创建成功',
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
    const data = await ctx.service.user.getOrderInfo(filter, attributesArray);
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
    const affectedRows = await ctx.service.user.updateOrderInfo(filter, attributesObject);

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
    ctx.body = {
      status: 1,
      data: affectedRows,
    };
    ctx.status = 200;
  }
}

module.exports = OrderController;
