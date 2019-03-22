const Service = require('egg').Service;

class PackageService extends Service {
  async createPackageInfo(body) {
    const ctx = this.ctx;
    const packageInfo = await ctx.model.Package.create({ ...body });
    // console.log(user.dataValues.id);
    return packageInfo.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  async getPackageInfo(filter, attributesArray = []) {
    const ctx = this.ctx;

    let packageInfo;
    if (attributesArray.length === 0) {
      packageInfo = await ctx.model.Package.findAll({
        where: { ...filter },
      });
    } else {
      packageInfo = await ctx.model.Package.findAll({
        where: { ...filter },
        attributes: attributesArray,
      });
    }

    // console.log(userInfo);
    return packageInfo.map(item => item.dataValues);
  }
  async updatePackageInfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.Package.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = PackageService;
