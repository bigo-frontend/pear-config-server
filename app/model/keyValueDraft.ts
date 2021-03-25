export default app => {
  const { STRING, INTEGER, TEXT, DATE, DataTypes } = app.Sequelize;
  const KeyValueDraft = app.model.define('KeyValueDraft', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    configRef: {
      type: INTEGER(64),
      field: 'json_config_id'
    },
    template: {
      type: INTEGER(64),
      field: 'json_schema_id'
    },
    config: {
      type: TEXT,
      field: 'draft_data'
    },
    author: {
      type: STRING(128),
      field: 'create_user'
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
    tableName: 'pear_json_config_draft',
  });

  return KeyValueDraft;
};