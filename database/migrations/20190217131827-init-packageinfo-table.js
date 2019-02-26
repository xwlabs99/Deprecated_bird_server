/**
 4．套餐数据表
（1）套餐ID id INT
（2）套餐名称 package_name VARCHAR
（3）套餐价格 package_price INT
（4）所属门店 bar_id INT
（5）套餐状态 status ENUM（使用中，已停用）
（6）套餐类型 type ENUM
（7）套餐消费次数 total_sale_number INT
（8）套餐创建时间 created_time DATE
（9）套餐修改时间 changed_time DATE
（10）套餐图片ID photo_id VARCHAR
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE, NOW } = Sequelize;
    await queryInterface.createTable('packages', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      package_name: STRING(50),
      package_price: INTEGER,
      tips: STRING(50),
      type: ENUM('普通套餐'),
      status: ENUM('使用中', '已停用'),
      total_sale_number: INTEGER,
      created_time: { type: DATE, defaultValue: NOW },
      changed_time: DATE,
      photo_id: INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('packages');
  },
};
