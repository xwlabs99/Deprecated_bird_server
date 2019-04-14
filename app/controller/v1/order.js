const Controller = require('egg').Controller;
const createRule = {
  // order_photo_id: 'int',
  // order_type: { type: 'enum', values: [ '预定单', '正价', '套餐', '自来客' ], required: false },
  require_type: { type: 'enum', values: [ '卡座', '吧台', '包房', '散台' ], required: true },
  // order_status: { type: 'enum', values: [ '预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消', '待修改', '已修改' ], required: false },
  // pay_method: { type: 'enum', values: [ '线上购买', '线下购买' ], required: false },
  // number: { type: 'int', required: true, default: 1 },
  customer_name: { type: 'string', required: false },
  customer_sex: { type: 'enum', values: [ '男', '女' ], required: true },
  customer_phone: { type: 'string', format: /^[1][3,4,5,7,8][0-9]{9}$/, required: true },
  tips: { type: 'string', default: '暂无备注', required: false },
  // is_phoned: { type: 'enum', values: [ '是', '否' ], required: false },
  // is_arrived: { type: 'enum', values: [ '是', '否' ], required: false },
  // package_id: { type: 'int', required: false },
  // consumption: { type: 'int', required: false },
  // bar_id: 'int',
  // creater_id: 'int',
  // saleperson_id: { type: 'int', required: false },
  // created_time: 'dateTime',
  // accepted_time: 'dateTime',
  // followed_time: 'dateTime',
  // finished_time: 'dateTime',
  // cancelled_time: '',
  // is_gootfeedback: { type: 'enum', values: [ '是', '否' ] },
  // customer_comment: 'string',
  // comment_tips: 'string',
};

class OrderController extends Controller {
  // POST
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body.data);
    const newBody = {
      ...ctx.request.body.data,
    };
    const id = await ctx.service.order.createOrderInfo(newBody);
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
    const { attributes: attributesArray = [], filter = {} } = ctx.request.body.data;
    const data = await ctx.service.order.getOrderInfo(filter, attributesArray);
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
    const { attributes: attributesObject = {}, filter = {} } = ctx.request.body.data;
    const affectedRows = await ctx.service.order.updateOrderInfo(filter, attributesObject);
    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }

  }
  async destroy() {
    const ctx = this.ctx;
    const attributesObject = { };
    const { filter = {} } = ctx.request.body.data;
    const affectedRows = await ctx.service.order.updateOrderInfo(filter, attributesObject);
    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }
}

module.exports = OrderController;
