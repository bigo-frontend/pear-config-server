const path = require("path");
const fs = require("fs");
const pkgInfo = require(path.join(process.cwd(), "./package.json"));
const { datasources } = require(path.join(
  process.cwd(),
  "./config/datasources.ts"
));
const shell = require("shelljs");

function getDataBaseConfig() {
  const datasource = datasources[0];
  const HOSTNAME = datasource.host;
  const PORT = datasource.port;
  const USERNAME = datasource.username;
  const PASSWORD = datasource.password;
  const DBNAME = datasource.database;
  console.log(`当前数据库配置：`);
  console.log(`host: ${HOSTNAME}`);
  console.log(`port: ${PORT}`);
  console.log(`username: ${USERNAME}`);
  console.log(`password: ${PASSWORD}`);
  console.log(`database: ${DBNAME}`);
  console.log(`------------------分割线------------------------`);
  return { HOSTNAME, PORT, USERNAME, PASSWORD, DBNAME };
}

function initDataBase() {
  const config = getDataBaseConfig();
  // 初始化数据库
  console.log(`如果密码为空，请直接回车`);
  const createDBSqlCammand = createDBSql(config);
  shell.exec(createDBSqlCammand, async function (code, stdout, stderr) {
    if (code !== 0) {
      console.log("初始化数据库异常，请检查配置");
      console.log("或者手动在命令行执行：" + createDBSqlCammand);
      console.log(stdout, stderr);
      return;
    }
    console.log(`执行成功`);
    const files = shell.ls(path.join(__dirname, "./table-schema/*.js"));
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const sql = require(file);
      console.log(`------------------分割线------------------------`);
      console.log("初始化表结构：" + path.basename(file));
      console.log(`如果密码为空，请直接回车`);
      try {
        await createTabel(config, sql);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function createTabel(config, sql) {
  return new Promise((resolve, reject) => {
    shell.exec(
      createTabelSql(config, sql.create_table_sql.replace(/\n/g, '')),
      function (code, stdout, stderr) {
        if (code !== 0) {
          console.log("初始化表结构异常，请检查配置");
          console.log(stdout, stderr);
          reject(stderr);
          return;
        }
        resolve();
        console.log(`执行成功`);
      }
    );
  });
}

// 初始化数据库
function createDBSql({ HOSTNAME, PORT, USERNAME, PASSWORD, DBNAME }) {
  const createDbSql = `create database IF NOT EXISTS ${DBNAME}`;
  const sql = `mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} -e"${createDbSql}"`;
  return sql;
}

// 初始化表结构
function createTabelSql(
  { HOSTNAME, PORT, USERNAME, PASSWORD, DBNAME },
  createTableSql
) {
  const sql = `mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${createTableSql}"`;
  return sql;
}

initDataBase();
