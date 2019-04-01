const Service = require('egg').Service;

class UserService extends Service {
  async createUserInfo(body) {
    const ctx = this.ctx;
    const { username, phone, phone_for_message, idcard, user_type, bar_id } = body;
    const password = ctx.helper.md5(body.password);
    const status = '审核中';
    const user = await ctx.model.User.create({ username, status, phone, phone_for_message, idcard, user_type, bar_id });
    console.log(user);
    await ctx.model.Login.create({ phone, password, userinfo_id: user.id });
    // console.log(user.dataValues.id);
    return user.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  //  这种查询用findAll 登陆信息的查询可以只用findOne
  async getUserInfo(filter, attributesArray = []) {
    const ctx = this.ctx;
    let userInfo;

    if (attributesArray.length === 0) {
      userInfo = await ctx.model.User.findAll({
        where: { ...filter },
      });
    } else {
      userInfo = await ctx.model.User.findAll({
        where: { ...filter },
        attributes: attributesArray,
      });
    }
    // console.log(userInfo);
    return userInfo.map(item => item.dataValues);
    // [{id:1},{id:2}]
  }
  async updateUserInfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.User.update(attributesObject, { where: filter });
    return update;
    // [ changedId ]
  }
}


module.exports = UserService;
