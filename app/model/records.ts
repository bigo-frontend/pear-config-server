export default app => {
  const { STRING, INTEGER, TEXT, DATE, DataTypes } = app.Sequelize;
  const Records = app.model.define('Records', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    configRef: {
      type: INTEGER(64),
      field: 'json_config_id',
    },
    template: {
      type: INTEGER(64),
      field: 'json_schema_id',
    },
    config: {
      type: TEXT,
      field: 'config_data',
    },
    author: {
      type: STRING(128),
      field: 'create_user',
    },
    type: {
      type: INTEGER(2),
      field: 'record_type',
    },
    extend: {
      type: STRING(128),
      field: 'extend',
    },
    createTime: {
      type: DATE,
      defaultValue: DataTypes.NOW,
      field: 'create_time',
    },
    updateTime: {
      type: DATE,
      defaultValue: DataTypes.NOW,
      field: 'update_time',
    },
    isDel: {
      type: INTEGER(1),
      defaultValue: 0,
      field: 'is_del',
    },
  }, {
    tableName: 'pear_json_config_records',
  });
  return Records;
};
