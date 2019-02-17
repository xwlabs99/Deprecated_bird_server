'use strict';
/*
用户信息表 user_info
（1）主键ID id INT
（2）用户名 username VARCHAR(50)
（3）电话号码 phone VARCHAR
（4）接受短信号码 phone_for_message VARCHAR
（5）注册时间 reg_date DATE
（6）身份证号 idcard VARCHAR(18+2)
（7）身份证照片名称 idcard_photo_id int
（8）用户账户状态 status ENUM（审核中，已通过审核，禁止登录）
（9）用户身份 user_type ENUM（管理员，区域管理，客服人员，销售员）
（10）所属酒吧 bar_id INT
*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE } = Sequelize;
    await queryInterface.createTable('user_info', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(50),
      phone: STRING(15),
      phone_for_message: STRING(15),
      created_time: DATE,
      idcard: STRING(20),
      idcard_photo_id: INTEGER,
      status: ENUM('审核中', '已通过', '禁止登录'),
      user_type: ENUM('管理员', '区域经理', '客服人员', '销售员'),
      bar_id: INTEGER,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_info');
  },
};
