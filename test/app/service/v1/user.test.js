// const assert = require('assert');
const mock = require('egg-mock');
// const factory = require('factory-girl').factory;

describe('test/controller/v1/user.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });
  it('测试创建用户', async () => {
    const ctx = app.mockContext();
    const id = await ctx.service.user.createUserInfo({
      username: '魏祥',
      phone: '17521558241',
      phone_for_message: '17521558241',
      idcard: '360403199907200355',
      user_type: '管理员',
      bar_id: 0,
    });
    console.log(id);
  });

  it('测试查找用户信息', async () => {
    const ctx = app.mockContext();
    const userInfo = await ctx.service.user.getUserInfo({
      status: '审核中',
    }, [ 'id' ]);
    console.log(userInfo);
  });

  it('测试修改用户信息', async () => {
    const ctx = app.mockContext();
    const userInfo = await ctx.service.user.updateUserInfo({
      id: 1,
    }, {
      username: '王八',
    });
    console.log(userInfo);
  });
});
