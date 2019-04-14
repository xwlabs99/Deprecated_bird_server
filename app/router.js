/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/', controller.home.post);
  // router.post('/api/v1/upload', controller.v1.upload.singleUpload);


  const resource = (url, controller) => {
    router.get(url, controller.show);
    router.post(url, controller.create);
    router.put(url, controller.update);
    router.del(url, controller.destroy);
  };

  router.post('/login', controller.v1.login.login);
  router.get('/loginbyjwt', controller.v1.login.loginByJWT);
  router.post('/register', controller.v1.login.register);
  router.post('/changepassword', controller.v1.login.changePassword);
  resource('/api/v1/user', controller.v1.user);
  resource('/api/v1/bar', controller.v1.bar);
  resource('/api/v1/image', controller.v1.image);
  resource('/api/v1/package', controller.v1.package);
  resource('/api/v1/order', controller.v1.order);
  resource('/api/v1/announcement', controller.v1.announcement);
};
