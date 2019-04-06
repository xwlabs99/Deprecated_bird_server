

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('authinfo', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      bar_id: INTEGER,
      tip: STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable('authinfo');
  },
};
