export default app => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;
  const Env = app.model.define('Env', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    envName: {
      type: STRING(128),
      field: 'biz_name'
    },
    description: {
      type: STRING(128),
      field: 'biz_desc'
    },
    cdnDomain: {
      type: STRING(128),
      field: 'cdn_domain'
    },
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
    tableName: 'pear_biz_type',
  });

  return Env;
};