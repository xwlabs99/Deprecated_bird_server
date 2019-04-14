
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW, ENUM } = Sequelize;
    await queryInterface.createTable('announcements', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      status: ENUM('正常', '已停用'),
      bar_id: { type: INTEGER },
      visible_user_type: ENUM('门店客服', '销售员', '所有人'),
      content: { type: STRING(100) },
      creater_id: { type: INTEGER },
      created_time: { type: DATE, defaultValue: NOW },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable('announcements');
  },
};
