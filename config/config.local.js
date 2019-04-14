const path = require('path');
module.exports = appInfo => {

  const config = {};
  config.keys = appInfo.name + '_1550213086228_1468';
  config.jwtKey = 'weixiang1999';
  config.hashKey = 'weixiang1999';
  config.ImagePath = '/public/image/';
  // add your middleware config here
  // config.middleware = [ 'errorHandler' ];
  config.middleware = [ 'errorHandler', 'parseJWT', 'parseParams', 'limitJwt', 'limitAuthority', 'modifyFilter' ];
  // add your user config here
  config.parseJWT = {
    match: '/api/v1',
  };
  config.parseParams = {
    match: '/api/v1',
  };
  config.limitAuthority = {
    match: '/api/v1',
  };
  config.limitJwt = {
    match: '/api/v1',
  };
  config.modifyFilter = {
    match: '/api/v1',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.multipart = {
    whitelist: [
      '.jpg',
      '.jpeg',
    ],
    mode: 'file',
    // fileSize: '50mb',
  };
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'public/'),
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
