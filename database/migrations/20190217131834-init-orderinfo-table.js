/*
订单数据表
（）订单ID  id INT
（）消费者名称 customer_name VARCHAR
（）消费者性别 customer_sex ENUM(男，女)
（）消费者手机号 customer_phone VARCHAR
（）订单凭证 order_photo_id INT
（）订单类型 order_type ENUM（预定单，正价，套餐，自来客）
（）订单状态 order_status ENUM（预定中，待接受，待跟进，已跟进，已完成，待更正，已取消）
 () 结账方式 pay_method ENUM (线上购买，线下购买) --订单跟进后确定
（）备注1 tips1 VARCHAR
（）备注2 tips2 VARCHAR
（）是否已经拨打电话 is_phoned ENUM（是，否）
（）客户是否到店 is_arrived ENUM（是，否）
（）是否好评 is_goodfeedback ENUM（是，否）
（）消费套餐ID package_id INT
（）实际消费额 consumption INT
（）订单所属酒吧 barid INT 添加索引
（）创建人ID creater_id INT
（）接单人ID saleperson_id INT
（）创建时间 created_time DATE 添加索引
（）接单时间 accepted_time DATE
（）跟进时间 followed_time DATE
（）完成时间 finished_time DATE
（）客户评价 customer_comment VARCHAR
（）评价备注 comment_tips VARCHAR
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE, NOW } = Sequelize;
    await queryInterface.createTable('orders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      order_photo_id: INTEGER,
      order_type: ENUM('预定单', '正价', '套餐', '自来客'),
      require_type: ENUM('卡座', '吧台', '包房', '散台'),
      order_status: ENUM('预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消', '待修改'),
      pay_method: ENUM('线上购买', '线下购买'),
      number: INTEGER,
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
      created_time: { type: DATE, defaultValue: NOW },
      accepted_time: DATE,
      followed_time: DATE,
      finished_time: DATE,
      cancelled_time: DATE,
      is_goodfeedback: ENUM('是', '否'),
      customer_comment: STRING(50),
      comment_tips: STRING(30),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('orders');
  },
};
