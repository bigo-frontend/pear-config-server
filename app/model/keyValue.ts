export default app => {
  const { STRING, INTEGER, TEXT, DATE, DataTypes } = app.Sequelize;
  const KeyValue = app.model.define('KeyValue', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    title: STRING(128),
    config: {
      type: TEXT,
      field: 'config_data'
    }, // 草稿配置
    grayConfig: {
      type: TEXT,
      field: 'gray_config_data'
    },
    publishConfig: {
      type: TEXT,
      field: 'publish_config_data'
    },
    grayCdnUrl: {
      type: STRING(128),
      field: 'gray_cdn_url'
    },
    cdnUrl: {
      type: STRING(128),
      field: 'cdn_url'
    },
    status: {
      type: STRING(36),
      field: 'publish_status'
    },
    env: {
      type: INTEGER(64),
      field: 'biz_type_id'
    },
    template: {
      type: INTEGER(64),
      field: 'json_schema_id'
    },
    author: {
      type: STRING(128),
      field: 'create_user'
    },
    editor: {
      type: STRING(128),
      field: 'editor'
    },
    tags: {
      type: STRING(128),
      field: 'tags'
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
    tableName: 'pear_json_config',
  });

  return KeyValue;
};