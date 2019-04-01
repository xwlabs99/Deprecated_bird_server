
module.exports = appInfo => {

  const config = {};
  config.keys = appInfo.name + '_1550213086228_1468';
  config.jwtKey = 'weixiang1999';

  // add your middleware config here
  config.middleware = [ 'checkAuthority', 'parseJWT', 'errorHandler' ];
  // add your user config here
  config.parseJWT = {
    match: '/api',
  };
  config.checkAuthority = {
    match: '/api/v1',
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
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
