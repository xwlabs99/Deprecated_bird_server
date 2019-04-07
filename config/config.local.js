
module.exports = appInfo => {

  const config = {};
  config.keys = appInfo.name + '_1550213086228_1468';
  config.jwtKey = 'weixiang1999';
  config.ImagePath = '/public/image/';
  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  // config.middleware = [ 'parseJWT', 'checkAuthority', 'errorHandler' ];
  // add your user config here
  config.parseJWT = {
    match: '/api/v1',
  };

  config.checkAuthority = {
    match: '/api/v1',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.multipart = {
    whitelist: [
      '.jpg',
      '.jpeg',
    ],
    mode: 'file',
  };
  const userConfig = {
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'bird_server',
      user: 'root',
      password: 'weixiang1999',
    },
    mysql: {
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'weixiang1999',
        database: 'bird_server',
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
