const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const message = ctx.query.message;
    // const wechat = this.app.Wechat.
    ctx.body = ctx.request.body;
  }
  async post() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
  }
}

module.exports = HomeController;
