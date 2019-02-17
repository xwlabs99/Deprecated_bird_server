'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Order = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_photo_id: INTEGER,
    order_type: ENUM('预定单', '正价', '套餐', '自来客'),
    order_statu: ENUM('预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消'),
    customer_name: STRING(20),
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
    create_time: DATE,
    accept_time: DATE,
    follow_time: DATE,
    finish_time: DATE,
    is_gootfeedback: ENUM('是', '否'),
    customer_comment: STRING(50),
    comment_tips: STRING(30),
  });

  return Order;
};
