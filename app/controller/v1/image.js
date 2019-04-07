const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');


class ImageController extends Controller {
  // POST
  async create() {
    // 图片上传特殊处理
    const ctx = this.ctx;
    const file = ctx.request.files[0];
    const fileName = ctx.request.body.filename;
    const { key1 = '', key2 = '', value1 = '', value2 = '' } = ctx.request.body;
    // console.log(this.config.baseDir);
    // console.log(ctx.request.body);
    if (!file) {
      ctx.body = {
        status: 0,
        message: '没有要上传的图片',
      };
      return;
    }
    const filename = encodeURIComponent(fileName) + path.extname(file.filename).toLowerCase();
    const targetPath = path.join(this.config.baseDir, this.config.ImagePath, filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      await ctx.cleanupRequestFiles();
    }
    const old = await ctx.service.image.getImageInfo({
      filename,
    });
    console.log(old);
    if (old) {
      ctx.body = {
        status: 0,
        message: '图片名重复',
      };
    } else {
      const id = await ctx.service.image.createImageInfo({
        key1,
        key2,
        value1,
        value2,
        filename,
        path: this.config.ImagePath + filename,
      });
      ctx.body = {
        status: 1,
        message: '创建成功',
        data: {
          id,
          path: this.config.ImagePath + filename,
        },
      };
    }
  }
  // GET
  async show() {
    const ctx = this.ctx;
    const attributesArray = ctx.queries.attributes || [];
    delete ctx.queries.attributes;// 去掉queries属性
    const filter = { ...ctx.queries };
    const data = await ctx.service.user.getImageInfo(filter, attributesArray);
    ctx.body = {
      status: data.length === 0 ? 0 : 1,
      message: data.length === 0 ? '没有符合条件的信息' : '',
      data,
    };
    ctx.status = 200;
  }
  // PUT
  async update() {
    const ctx = this.ctx;
    const attributesObject = ctx.body.data.attributes || [];
    const filter = ctx.body.data.filter;
    const affectedRows = await ctx.service.user.updateImageinfo(filter, attributesObject);

    if (affectedRows[0] !== 0) {
      ctx.body = { status: 1, message: '修改成功' };
    } else {
      ctx.body = { status: 0, message: '不存在要修改的列' };
    }
  }
  async destroy() {
    this.ctx.body = {
      status: 0,
    };
  }
}

module.exports = ImageController;
