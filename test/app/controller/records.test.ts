import bigoMock from "../../global";

// TESTS=test/app/controller/records.test.ts npm test
describe("发布历史记录接口单测", () => {
  it("查询发布记录配置分页-成功", async () => {
    bigoMock.app.mockService("records", "getList", () => {
      return {
        "status": true,
        "data": [
          {
            "_id": 10000000016,
            "config": [Object],
            "configId": 10000000091,
            "lastEditTime": "2021-12-24T03:26:42.000Z"
          },
          {
            "_id": 10000000015,
            "config": [Object],
            "configId": 10000000091,
            "lastEditTime": "2021-12-24T03:26:31.000Z"
          },
          {
            "_id": 10000000014,
            "config": [Object],
            "configId": 10000000091,
            "lastEditTime": "2021-12-24T03:26:24.000Z"
          },
          {
            "_id": 10000000013,
            "config": [Object],
            "configId": 10000000091,
            "lastEditTime": "2021-12-24T03:26:16.000Z"
          },
          {
            "_id": 10000000012,
            "config": [Object],
            "configId": 10000000091,
            "lastEditTime": "2021-12-24T03:23:16.000Z"
          }
        ],
        "total": 6
      }
    })

    const result = await bigoMock.app
      .httpRequest()
      .get("/records?configRef=10000000091&pageSize=5&pageIndex=1");

    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 6);
  });

  it("发布历史记录预览接口-成功", async () => {
    bigoMock.app.mockService("records", "getDetail", () => {
      return { 
        "title": "123", 
        "richTextContent": "hello bigo" 
      }
    });

    const result = await bigoMock.app
      .httpRequest()
      .get("/records/preview/prod/10000000016");

    bigoMock.assert(result.body.title === "123");
    bigoMock.assert(result.body.richTextContent === "hello bigo");
  });

  it("跟进发布id回滚配置json配置-成功", async () => {
    bigoMock.app.mockService("records", "rollback", () => {
      return {
        "status": true,
        "data": {
          "_id": 10000000091,
          "title": "test",
          "config": "{\"title\":\"123\",\"richTextContent\":\"<p>ddddaaaadf</p>\\n\\n<p>qerqwrq</p>\\n\"}",
          "grayConfig": null,
          "publishConfig": "{\"title\":\"123\",\"richTextContent\":\"<p>ddddaaaadf</p>\\n\\n<p>qerqwrq</p>\\n\\n<p>333</p>\\n\"}",
          "grayCdnUrl": "",
          "cdnUrl": "https://static-web.bigolive.tvpublic/json/10000000091.json",
          "status": "reedit",
          "env": 10000000005,
          "template": 10000000330,
          "author": "admin",
          "editor": "",
          "tags": "",
          "createTime": "2021-12-24T02:45:04.000Z",
          "updateTime": "2022-01-04T10:24:34.000Z",
          "isDel": 0
        }
      }
    });

    const result = await bigoMock.app
      .httpRequest()
      .post("/records/rollback")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        configId: 10000000091,
        recordId: 10000000015,
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.title === "test");
  });

  it("跟进发布id回滚配置json配置-失败，回滚id不存在", async () => {
    bigoMock.app.mockService("records", "rollback", () => {
      return {
        "status": false,
        "msg": "该记录不存在"
      }
    });

    const result = await bigoMock.app
      .httpRequest()
      .post("/records/rollback")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        configId: 10000000091,
        recordId: 10000000115,
      });

    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "该记录不存在");
  });
});