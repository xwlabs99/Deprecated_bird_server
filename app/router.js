/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.v1.login.login);

  // RESTful API
  router.resources('users', '/api/v1/user', controller.v1.user);
  // router.resources('bars', '/api/v1/bar', controller.v1.bar);
  // router.resources('packages', '/api/v1/package', controller.v1.package);
  // router.resources('images', '/api/v1/image', controller.v1.image);
  // router.resources('orders', '/api/v1/order', controller.v1.order);
};
