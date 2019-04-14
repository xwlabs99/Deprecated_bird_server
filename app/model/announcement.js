

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, ENUM } = app.Sequelize;

  const Announcement = app.model.define('announcement', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    bar_id: { type: INTEGER },
    visible_user_type: ENUM('门店客服', '销售员', '所有人'),
    content: { type: STRING(100) },
    creater_id: { type: INTEGER },
    created_time: { type: DATE, defaultValue: NOW },
  });

  return Announcement;
};

