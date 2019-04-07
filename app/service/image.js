const Service = require('egg').Service;

class ImageService extends Service {
  async createImageInfo(body) {
    const ctx = this.ctx;
    const image = await ctx.model.Image.create({ ...body });
    // console.log(user.dataValues.id);
    return image.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  // 需要加过滤器,对NULL等空信息进行处理
  async getImageInfo(filter) {
    const ctx = this.ctx;
    const imageInfo = await ctx.model.Image.findOne({
      where: { ...filter },
    });
    // console.log(userInfo);
    return imageInfo;
  }
  async updateImageInfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.Image.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = ImageService;
