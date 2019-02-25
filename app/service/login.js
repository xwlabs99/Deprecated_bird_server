'use strict';
const Service = require('egg').Service;

class LoginService extends Service {
  async createBarinfo(body) {
    const ctx = this.ctx;
    const login = await ctx.model.Login.create(body);
    // console.log(user.dataValues.id);
    return login.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  // 需要加过滤器,对NULL等空信息进行处理
  async getBarInfo(filter, attributesArray) {
    const ctx = this.ctx;
    const loginInfo = ctx.model.Login.findAll({
      where: { ...filter },
      attributes: attributesArray,
    });
    // console.log(userInfo);
    return loginInfo;
  }
  async updateBarinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = ctx.model.Login.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = LoginService;
