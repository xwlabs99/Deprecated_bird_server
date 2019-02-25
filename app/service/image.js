'use strict';
const Service = require('egg').Service;

class ImageService extends Service {
  async createImageinfo(body) {
    const ctx = this.ctx;
    const image = await ctx.model.Image.create({ ...body });
    // console.log(user.dataValues.id);
    return image.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  // 需要加过滤器,对NULL等空信息进行处理
  async getImageInfo(filter, attributesArray) {
    const ctx = this.ctx;
    const imageInfo = ctx.model.Image.findAll({
      where: { ...filter },
      attributes: attributesArray,
    });
    // console.log(userInfo);
    return imageInfo;
  }
  async updateImageinfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = ctx.model.Image.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = ImageService;
