export default app => {
  const { STRING, INTEGER, TEXT, DATE, DataTypes } = app.Sequelize;
  const Form = app.model.define('Form', {
    _id: {
      type: INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    formKey: {
      type: STRING(128),
      field: 'schema_desc'
    },
    jsonSchema: {
      type: TEXT,
      field: 'schema_config'
    },
    envId: {
      type: INTEGER(64),
      field: 'biz_type_id'
    },
    tags: STRING(128),
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
    tableName: 'pear_json_schema',
  });

  return Form;
};