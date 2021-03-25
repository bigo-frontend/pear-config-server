/**
 * json配置表，依赖pear_json_schema的结构生成数据
 */
exports.create_table_sql=`create table IF NOT EXISTS pear_json_config (
id BIGINT(64) AUTO_INCREMENT,
title VARCHAR(128) DEFAULT NULL,
config_data TEXT DEFAULT NULL, 
gray_config_data TEXT DEFAULT NULL, 
publish_config_data TEXT DEFAULT NULL, 
publish_status VARCHAR(36) DEFAULT NULL,
biz_type_id BIGINT(64) DEFAULT NULL,
json_schema_id BIGINT(64) DEFAULT NULL,
gray_cdn_url VARCHAR(128) DEFAULT NULL,
cdn_url VARCHAR(128) DEFAULT NULL,
tags VARCHAR(128) DEFAULT NULL,
extend TEXT DEFAULT NULL,
create_user VARCHAR(128) DEFAULT NULL,
editor VARCHAR(128) DEFAULT NULL,
create_time DATETIME DEFAULT NULL,
update_time DATETIME DEFAULT NULL,
is_del TINYINT(1) DEFAULT 0,
PRIMARY KEY (id),
INDEX (title),
INDEX (publish_status),
INDEX (biz_type_id)
) AUTO_INCREMENT = 10000000001;`;
