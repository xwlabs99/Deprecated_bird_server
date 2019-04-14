const Service = require('egg').Service;

class AnnouncementService extends Service {
  async createAnnounceInfo(body) {
    const ctx = this.ctx;
    const Info = await ctx.model.Announcement.create({ ...body });
    return Info.dataValues.id;
  }
  //  根据特定属性 filter:object attributes:array
  async getAnnounceInfo(filter, attributesArray = []) {
    const ctx = this.ctx;

    let Info;
    if (attributesArray.length === 0) {
      Info = await ctx.model.Announcement.findAll({
        where: { ...filter },
      });
    } else {
      Info = await ctx.model.Announcement.findAll({
        where: { ...filter },
        attributes: attributesArray,
      });
    }

    // console.log(userInfo);
    return Info.map(item => item.dataValues);
  }
  async updateAnnounceInfo(filter, attributesObject) {
    const ctx = this.ctx;
    const update = await ctx.model.Announcement.update(attributesObject, { where: filter });
    return update;
  }
}


module.exports = AnnouncementService;
