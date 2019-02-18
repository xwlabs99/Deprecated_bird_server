'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const MysqlClient = this.app.mysql;
    const { ctx } = this;
    const Result = await MysqlClient.query('insert into user_info (username) values ("weixiang")');
    ctx.body = Result;
    console.log(ctx.query);
  }
}

module.exports = HomeController;
