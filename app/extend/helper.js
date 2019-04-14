const crypto = require('crypto');
const JWT = require('jsonwebtoken');
const Hashids = require('hashids');
const hashids = new Hashids();
// const app = require('egg').Application;
module.exports = {
  md5(str) {
    const salt = '(!%&88hsdh@qo*)#ausshds9';
    const md5 = crypto.createHash('md5');
    const md5_str = md5.update(str + salt).digest('hex');
    return md5_str;
  },
  JWTverify(jwt, key) {
    return new Promise((resolve, reject) => {
      JWT.verify(jwt, key, async (err, decode) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decode);
        }
      });
    });
  },
  hashid: {
    encode: str => hashids.encode(str),
    decode: str => hashids.decode(str),
  },
};
