'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async createUserinfo(body) {
    const ctx = this.ctx;
    const { username, phone, phone_for_message, idcard, user_type, bar_id } = body;
    const status = '审核中';
    const user = await ctx.model.User.create({ username, status, phone, phone_for_message, idcard, user_type, bar_id });
    // console.log(user.dataValues.id);
    return user.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  async getUserInfo(filter, attributesArray) {
    const ctx = this.ctx;
    const userInfo = ctx.model.User.findAll({
      where: { ...filter },
      attributes: attributesArray,
    });
    // console.log(userInfo);
    return userInfo;
  }
  async updateUserinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = ctx.model.User.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = UserService;
