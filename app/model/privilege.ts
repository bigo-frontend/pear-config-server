export default app => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;
  const Privilege = app.model.define('Privilege', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    privilegeType: {
      type: STRING(128),
      field: 'auth_type'
    },
    privilegeDesc: {
      type: STRING(128),
      field: 'auth_desc'
    },
    role: STRING(128),
    createTime: {
      type: DATE,
      defaultValue: DataTypes.NOW,
      field: 'create_time'
    },
    updateTime: {
      type: DATE,
      defaultValue: DataTypes.NOW,
      field: 'update_time'
    },
    isDel: {
      type: INTEGER(1),
      defaultValue: 0,
      field: 'is_del'
    },
  }, {
    tableName: 'pear_role_auth',
  });

  return Privilege;
};