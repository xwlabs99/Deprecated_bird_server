module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;

  const Authority = app.model.define('authority', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    authority_name: STRING(30),
    table_name: STRING(20),
    opetation: ENUM('READ', 'UPDATE', 'CREATE', 'DELETE'),
    extra: INTEGER,
  });

  return Authority;
};
