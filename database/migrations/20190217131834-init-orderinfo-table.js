/*
订单数据表
（1）订单ID  id INT
（2）订单凭证 order_photo_id INT
（3）订单类型 order_type ENUM（预定单，正价，套餐，自来客）
（4）订单状态 order_status ENUM（预定中，待接受，待跟进，已跟进，已完成，已取消）
（5）消费者名称 customer_name VARCHAR
（6）消费者性别 customer_sex ENUM(男，女)
（7）消费者手机号 customer_phone VARCHAR
（8）备注1 tips1 VARCHAR
（9）备注2 tips2 VARCHAR
（10）是否已经拨打电话 is_phoned ENUM（是，否）
（11）客户是否到店 is_arrived ENUM（是，否）
（12）消费套餐ID package_id INT
（13）实际消费额 consumption INT
（14）订单所属酒吧 barid INT
（15）创建人ID creater_id INT
（16）接单人ID saleperson_id INT
（17）创建时间 create_time DATE
（18）接单时间 accept_time DATE
（19）跟进时间 follow_time DATE
（20）完成时间 finish_time DATE
（21）客户评价 customer_comment VARCHAR
（22）评价备注 comment_tips VARCHAR
*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE, NOW } = Sequelize;
    await queryInterface.createTable('orders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      order_photo_id: INTEGER,
      order_type: ENUM('预定单', '正价', '套餐', '自来客'),
      order_status: ENUM('预定中', '待接受', '待跟进', '已跟进', '已完成', '已取消'),
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
