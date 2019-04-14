

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, NOW } = app.Sequelize;

  const Order = app.model.define('order', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_photo_id: INTEGER,
    order_type: ENUM('预定单', '正价', '套餐', '自来客'),
    require_type: ENUM('卡座', '吧台', '包房', '散台'),
    order_status: { type: ENUM('预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消', '待修改'), defaultValue: '待接受' },
    pay_method: ENUM('线上购买', '线下购买'),
    number: INTEGER,
    customer_name: { type: STRING(20), defaultValue: '暂无' },
    customer_sex: ENUM('男', '女'),
    customer_phone: STRING(15),
    tips: STRING(20),
    is_phoned: ENUM('是', '否'),
    is_arrived: ENUM('是', '否'),
    package_id: INTEGER,
    consumption: INTEGER,
    bar_id: INTEGER,
    creater_id: INTEGER,
    saleperson_id: INTEGER,
    created_time: { type: DATE, defaultValue: NOW },
    accepted_time: DATE,
    followed_time: DATE,
    finished_time: DATE,
    cancelled_time: DATE,
    is_goodfeedback: ENUM('是', '否'),
    customer_comment: STRING(50),
    comment_tips: STRING(30),
  });

  return Order;
};
