/**
 * json配置草稿表
 */
exports.create_table_sql=`create table IF NOT EXISTS pear_json_config_draft(
id BIGINT(64) AUTO_INCREMENT,
json_config_id BIGINT(64) DEFAULT NULL,
json_schema_id BIGINT(64) DEFAULT NULL,
draft_data TEXT DEFAULT NULL,
create_user VARCHAR(128) DEFAULT NULL,
create_time DATETIME DEFAULT NULL,
update_time DATETIME DEFAULT NULL,
is_del TINYINT(1) DEFAULT 0,
PRIMARY KEY (id),
INDEX (json_config_id)
) AUTO_INCREMENT = 10000000001;`;
