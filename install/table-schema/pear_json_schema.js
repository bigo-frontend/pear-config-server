/**
 * json_schema表，为pear_json_config表提供数据结构描述
 */
exports.create_table_sql=`create table IF NOT EXISTS pear_json_schema (
  id BIGINT(64) AUTO_INCREMENT,
  schema_desc VARCHAR(128) DEFAULT NULL,
  biz_type_id BIGINT(64) DEFAULT NULL,
  schema_config TEXT DEFAULT NULL,
  tags VARCHAR(128) DEFAULT NULL,
  create_user VARCHAR(128) DEFAULT NULL,
  create_time DATETIME DEFAULT NULL,
  update_time DATETIME DEFAULT NULL,
  is_del TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id),
  INDEX (biz_type_id),
  INDEX (tags)
  ) AUTO_INCREMENT = 10000000001;`;
  