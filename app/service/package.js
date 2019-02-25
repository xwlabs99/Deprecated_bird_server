'use strict';
const Service = require('egg').Service;

class PackageService extends Service {
  async createPackageinfo(body) {
    const ctx = this.ctx;
    const packageInfo = await ctx.model.Package.create({ ...body });
    // console.log(user.dataValues.id);
    return packageInfo.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  async getPackageInfo(filter, attributesArray) {
    const ctx = this.ctx;
    const packageInfo = ctx.model.Package.findAll({
      where: { ...filter },
      attributes: attributesArray,
    });
    // console.log(userInfo);
    return packageInfo;
  }
  async updatePackageinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = ctx.model.Package.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = PackageService;
