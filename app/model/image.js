'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Photo = app.model.define('image', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    key1: STRING(20),
    value1: STRING(20),
    key2: STRING(20),
    value2: STRING(20),
    path: STRING(100),
    create_time: { type: DATE, defaultValue: NOW },
  });

  return Photo;
};
