module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_name: STRING,
  });

  return Role;
};

