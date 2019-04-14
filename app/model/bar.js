module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, NOW } = app.Sequelize;
  const Bar = app.model.define('bar', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    bar_name: STRING(50),
    province: STRING(15),
    city: STRING(15),
    area: { type: STRING(15), defaultValue: '暂无' },
    wechat_name: STRING(30),
    commission_ratio: INTEGER,
    created_time: { type: DATE, defaultValue: NOW },
    tips: STRING(50),
    type: ENUM('普通酒吧', '测试酒吧'),
    status: ENUM('未开放', '运营中', '已停用'),
  });
  return Bar;
};

