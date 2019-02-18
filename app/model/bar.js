'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, NOW } = app.Sequelize;

  const Bar = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    bar_name: STRING(50),
    location: STRING(20),
    created_time: { type: DATE, defaultValue: NOW },
    tips: STRING(50),
    type: ENUM('普通酒吧', '测试酒吧'),
    status: ENUM('运营中', '已停用'),
  });

  return Bar;
};
