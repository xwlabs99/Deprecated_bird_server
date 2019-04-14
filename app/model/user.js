module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, NOW } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(50),
    phone: STRING(15),
    phone_for_message: STRING(15),
    created_time: { type: DATE, defaultValue: NOW },
    idcard: STRING(20),
    wechat_name: STRING(20),
    wechat_alias: STRING(20),
    idcard_photo_id_0: INTEGER,
    idcard_photo_id_1: INTEGER,
    status: ENUM('审核中', '已通过', '禁止登录'),
    user_type: ENUM('管理员', '区域经理', '客服人员', '销售员'),
    bar_id: INTEGER,
  });

  return User;
};
