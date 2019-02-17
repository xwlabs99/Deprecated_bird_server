'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Login = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    phone: STRING(13),
    password: STRING(50),
    userinfo_id: INTEGER,
  });

  return Login;
};
