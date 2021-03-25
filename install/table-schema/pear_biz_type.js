/**
 * 业务表，按照不同的业务线分类
 */
exports.create_table_sql=`create table IF NOT EXISTS pear_biz_type (
  id BIGINT(64) AUTO_INCREMENT,
  biz_desc VARCHAR(128) DEFAULT NULL,
  biz_name VARCHAR(128) DEFAULT NULL,
  cdn_domain VARCHAR(128) DEFAULT NULL,
  create_time DATETIME DEFAULT NULL,
  update_time DATETIME DEFAULT NULL,
  is_del TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id),
  INDEX (biz_name)
  ) AUTO_INCREMENT = 10000000001;`;
  