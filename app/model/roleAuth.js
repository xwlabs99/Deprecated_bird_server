module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const RoleAuth = app.model.define('role_authority', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    tip: STRING,
    role_id: { type: INTEGER },
    authority_id: { type: INTEGER },
  });

  return RoleAuth;
};
