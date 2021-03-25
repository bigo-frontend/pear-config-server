const datasources =  [
  {
    database: "pear_config",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    // 如下配置不需要修改
    delegate: "model", // load all models to app.adminModel and ctx.adminModel
    baseDir: "model", // load models from `app/admin_model/*.js`
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    dbtype: "mysql",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
];

module.exports.datasources = datasources;