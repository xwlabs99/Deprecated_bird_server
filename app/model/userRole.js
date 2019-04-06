module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const UserRole = app.model.define('user_role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: INTEGER },
    role_id: { type: INTEGER },
  });

  return UserRole;
};

