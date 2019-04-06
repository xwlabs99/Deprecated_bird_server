/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // app.once('server', app.wechat.init);
  router.get('/', controller.home.index);
  router.get('/api', controller.home.index);

  const resource = (url, controller) => {
    router.get(url, controller.show);
    router.post(url, controller.create);
    router.put(url, controller.update);
    router.del(url, controller.destroy);
  };

  router.post('/login', controller.v1.login.login);
  router.get('/loginjwt', controller.v1.login.loginByJWT);
  router.post('/register', controller.v1.login.register);

  resource('/api/v1/user', controller.v1.user);
  resource('/api/v1/bar', controller.v1.bar);


  // router.resources('authoritys', '/api/v1/authority', controller.v1.authority);
  // router.resources('roles', '/api/v1/role', controller.v1.role);
  // router.resources('roleAuths', '/api/v1/roleauth', controller.v1.roleAuth);
  // router.resources('userRoles', '/api/v1/userrole', controller.v1.userRole);
  // router.resources('bars', '/api/v1/bar', controller.v1.bar);
  // router.resources('packages', '/api/v1/package', controller.v1.package);
  // router.resources('images', '/api/v1/image', controller.v1.image);
  // router.resources('orders', '/api/v1/order', controller.v1.order);
};
