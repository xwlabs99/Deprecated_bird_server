'use strict';
/*
 用户登录账号密码表 login_info
（1）主键ID id INT
（2）手机号 phone CHAR(13+1)
（3）密码 password VARCHAR(50)
（4）对应的用户信息ID userinfo_id INT
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('login_info', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      phone: STRING(13),
      password: STRING(50),
      userinfo_id: INTEGER,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('login_info');
  },
};
