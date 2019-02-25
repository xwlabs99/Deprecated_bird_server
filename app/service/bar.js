'use strict';
const Service = require('egg').Service;

class BarService extends Service {
  async createBarinfo(body) {
    const ctx = this.ctx;
    const { bar_name, location, tips, type } = body;
    const status = '未开放';
    const bar = await ctx.model.Bar.create({ bar_name, location, tips, type, status });
    // console.log(user.dataValues.id);
    return bar.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  // 需要加过滤器,对NULL等空信息进行处理
  async getBarInfo(filter, attributesArray) {
    const ctx = this.ctx;
    const barInfo = ctx.model.Bar.findAll({
      where: { ...filter },
      attributes: attributesArray,
    });
    // console.log(userInfo);
    return barInfo;
  }
  async updateBarinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = ctx.model.Bar.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = BarService;
