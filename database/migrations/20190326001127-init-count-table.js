
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE, NOW } = Sequelize;
    await queryInterface.createTable('count', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      date: { type: DATE, default: NOW },
      bar_id: INTEGER,
      // customer_
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('counts');
  },
};
