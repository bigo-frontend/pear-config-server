<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://static-web.likeevideo.com/as/common-static/pear/img/favicon.png">
  </a>
</p>

<h1 align="center">pear-config</h1>

<div align="center">

前端配置系统，包括但不限于：多语言、图片、文案、链接、时间、活动开关、业务逻辑等功能配置。前端基于配置进行逻辑对接，内容由产品、运营同学维护，分工明确，形成需求闭环，实现一键变更。

![NPM downloads][version-url] ![GitHub last commit](https://img.shields.io/github/last-commit/bigo-frontend/pear-config-server)

[version-url]: https://img.shields.io/badge/pear--config-v1.0.0-yellow
</div>


## ✨ Features

- 🌈 基于业务需求编写json-schema配置
- 📦 可视化界面，对非技术人员友好
- 🛡 一键变更，历史配置快速回滚
- ⚙️ json静态化，支持高并发
- 🌍 多语言支持
- 🎨 配置diff（todo）

## 🖥 Environment Support

- [Mysql](https://www.mysql.com/)
- [nodejs](https://nodejs.org/en/) (8.0+)

## 📦 Install

```bash
npm install
# 请先在本地启动mysql数据库服务，mysql安装教程：https://www.runoob.com/mysql/mysql-install.html
# 初始化数据库，请确保config/datasources.ts配置正确
npm run init
```

```bash
# 启动服务端项目
npm run dev
# open 127.0.0.1:9005
```

## 🔨 Usage

- [请参考](https://github.com/bigo-frontend/pear-config-server/blob/main/README.md)

## json静态化

```
开源版本默认json静态化到本地。
为了减轻服务器并发压力，可以考虑把json上传到cdn空间，业务直接get请求获取json内容。
请自行拓展upload2Cdn方法，实现cdn上传功能，pear-config-server/app/service/file.ts 。
```

## 目录结构

```bash
├── app
│   ├── controller
│   │   ├── baseController.ts                  
│   │   ├── env.ts                              # 业务分类
│   │   ├── form.ts                             # json-schema配置
│   │   ├── keyValue.ts                         # json配置
│   │   ├── keyValueDraft.ts                    # json配置草稿
│   │   ├── material.ts                         # 资源上传
│   │   └── privilege.ts                        # 权限管控
│   ├── model                   
│   │   ├── README.md                   
│   │   ├── env.ts                              # 数据库表定义
│   │   ├── form.ts                  
│   │   ├── keyValue.ts                   
│   │   ├── keyValueDraft.ts                  
│   │   └── privilege.ts                  
│   ├── public                  
│   ├── router.ts                   
│   ├── service           
│   │   ├── db.ts                               # 数据库操作公共类
│   │   ├── env.ts                              # 与controller对应的service
│   │   ├── file.ts                  
│   │   ├── form.ts                
│   │   ├── keyValue.ts             
│   │   ├── keyValueDraft.ts          
│   │   └── privilege.ts           
├── config
│   ├── datasources.ts                           # 数据库连接配置
├── install
│   ├── index.js                                 # 数据库表结构初始化
│   └── table-schema                             # 数据库表结构初始化执行语句
├── test                                         # 单测文件

```

## 🔗 Links

- [前端配置系统pear](https://github.com/bigo-frontend/blog/issues/8)
- [记一次页面配置化的实践](https://github.com/bigo-frontend/blog/issues/4)