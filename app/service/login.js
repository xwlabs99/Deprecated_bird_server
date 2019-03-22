const Service = require('egg').Service;

class LoginService extends Service {
  async createLogininfo(body) {
    const ctx = this.ctx;
    const login = await ctx.model.Login.create(body);
    // console.log(user.dataValues.id);
    return login.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  // 需要加过滤器,对NULL等空信息进行处理
  async getLoginInfo(filter) {
    const ctx = this.ctx;
    const loginInfo = await ctx.model.Login.findOne({
      where: { ...filter },
    });
    // console.log(userInfo);
    return loginInfo.map(item => item.dataValues);
  }
  async updateLogininfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.Login.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = LoginService;
