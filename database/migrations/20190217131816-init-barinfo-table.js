'use strict';
/*
3．酒吧信息表
（1）主键ID bar_id INT
（2）酒吧名称 bar_name VARCHAR
（3）所在省份+市区 （采用组合码记录）location VARCHAR(50)
（4）备注信息 tips VARCHAR(100)
（5）酒吧状态 status ENUM(运营中，已停用)
（6）酒吧类型 type
*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE, NOW } = Sequelize;
    await queryInterface.createTable('bar_info', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bar_name: STRING(50),
      location: STRING(20),
      created_time: { type: DATE, defaultValue: NOW },
      tips: STRING(50),
      type: ENUM('普通酒吧', '测试酒吧'),
      status: ENUM('运营中', '已停用'),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bar_info');
  },
};
