const Service = require('egg').Service;

class OrderService extends Service {
  async createOrderinfo(body) {
    const ctx = this.ctx;
    const order = await ctx.model.Order.create({ ...body });
    // console.log(user.dataValues.id);
    return order.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  async getOrderInfo(filter, attributesArray = []) {
    const ctx = this.ctx;
    let orderInfo;

    if (attributesArray.length === 0) {
      orderInfo = await ctx.model.Order.findAll({
        where: { ...filter },
      });
    } else {
      orderInfo = await ctx.model.Order.findAll({
        where: { ...filter },
        attributes: attributesArray,
      });
    }
    // console.log(userInfo);
    return orderInfo;
  }
  async updateOrderinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.Order.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = OrderService;
