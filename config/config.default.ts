import { EggAppConfig, PowerPartial } from "egg";
import * as path from "path";

const { datasources } = require('./datasources');

const port = 9005;
export default () => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin

  config.httpclient = {
    request: {
      timeout: 10000,
    },
  };

  config.logger = {
    dir: path.join(process.cwd(), "logs/pear-config"),
  };

  // add your egg config in here
  config.middleware = ["catchError", "httpLogs"];

  config.httpLogs = {
    ignore: [/^\/$/],
  };

  config.multipart = {
    mode: "file",
    tmpdir: path.resolve(__dirname, "../temp"),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      cron: "0 30 4 * * *",
    },
    fileSize: "5mb", //    文件大小限制-string, 错误：400 Bad request
    // whitelist: [], //    文件类型-白名单-array, 错误：400 Bad request
  };

  // 请在这里修改自己项目运行的端口
  config.cluster = {
    listen: {
      port,
    },
    nginxCode: 200,
  };

  // add your special config in here
  const bizConfig = {
    root: process.cwd(),
    fileDir: path.resolve(process.cwd(), "./app/public/json/"),
    imgDir: path.resolve(process.cwd(), "./app/public/img/"),
    domain: `http://127.0.0.1:${port}/`,
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  // 关闭csrf防控https://eggjs.org/zh-cn/core/security.html
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"],
  };

  config.sequelize = {
    dialectOptions: {
      connectTimeout: 60000,
      requestTimeout: 999999,
    },
    datasources,
  } as any;

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
