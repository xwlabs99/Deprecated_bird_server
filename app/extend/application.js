// app/extend/application.js
const WECHAT = Symbol('application#wechat');
const wechatBot = require('./wechat');
module.exports = {
  get Wechat() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[WECHAT]) {
      // 实际情况肯定更复杂
      this[WECHAT] = new wechatBot();
    }
    return this[WECHAT];
  },
};
