const crypto = require('crypto');
// const app = require('egg').Application;
module.exports = {
  md5(str) {
    const salt = '(!%&88hsdh@qo*)#ausshds9';
    const md5 = crypto.createHash('md5');
    const md5_str = md5.update(str + salt).digest('hex');
    return md5_str;
  },
};
