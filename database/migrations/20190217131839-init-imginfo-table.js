/**
 *6．图片数据表
（1）主键ID id
（2）图片分类信息1 key1（门面/套餐等）
（3）信息1对应值 value1
（4）图片分类信息2 key2
（5）信息2对应值 value2
（6）图片名称/路径 path
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW } = Sequelize;
    await queryInterface.createTable('images', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      key1: STRING(20),
      value1: STRING(20),
      key2: STRING(20),
      value2: STRING(20),
      path: STRING(100),
      created_time: { type: DATE, defaultValue: NOW },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable('images');
  },
};
