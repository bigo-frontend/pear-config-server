/**
 * 权限管理表
 */
exports.create_table_sql=`create table IF NOT EXISTS pear_role_auth (
  id BIGINT(64) AUTO_INCREMENT,
  auth_desc VARCHAR(128) DEFAULT NULL,
  auth_type VARCHAR(128) DEFAULT NULL,
  role VARCHAR(128) DEFAULT NULL,
  create_time DATETIME DEFAULT NULL,
  update_time DATETIME DEFAULT NULL,
  is_del TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id),
  INDEX (auth_type)
  ) AUTO_INCREMENT = 10000000001;`;
  