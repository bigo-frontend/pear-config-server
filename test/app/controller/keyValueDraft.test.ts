import bigoMock from "../../global";

// TESTS=test/app/controller/keyValueDraft.test.ts npm test
describe("json配置草稿单测", () => {
  
  it("查询json配置草稿分页-成功", async () => {
    bigoMock.app.mockService("keyValueDraft", "getList", () => {
      return {
        status: true,
        data: [
          {
            _id: 10000000014,
            config: [Object],
            configId: 10000000003,
            lastEditTime: "2021-03-09T11:17:58.000Z",
          },
          {
            _id: 10000000015,
            config: [Object],
            configId: 10000000003,
            lastEditTime: "2021-03-09T11:17:58.000Z",
          },
          {
            _id: 10000000009,
            config: [Object],
            configId: 10000000003,
            lastEditTime: "2021-03-09T10:38:37.000Z",
          },
          {
            _id: 10000000007,
            config: [Object],
            configId: 10000000003,
            lastEditTime: "2021-03-09T10:13:08.000Z",
          },
          {
            _id: 10000000008,
            config: [Object],
            configId: 10000000003,
            lastEditTime: "2021-03-09T10:13:08.000Z",
          },
        ],
        total: 9,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/keyValueDraft?configRef=10000000003&pageSize=5&pageIndex=1");
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 9);
  });

  it("根据草稿id回滚配置json配置-成功", async () => {
    bigoMock.app.mockService("keyValueDraft", "rollback", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          publishConfig: null,
          grayCdnUrl: "http://127.0.0.1:9005/public/json/gray-10000000003.json",
          cdnUrl: null,
          status: "reedit",
          env: null,
          template: null,
          author: "admin",
          editor: null,
          tags: "hello",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T13:17:56.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValueDraft/rollback")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        configId: 10000000003,
        draftId: 10000000014,
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.title === "嘉年华主会场2");
  });

  it("根据草稿id回滚配置json配置-失败，回滚id不存在", async () => {
    bigoMock.app.mockService("keyValueDraft", "rollback", () => {
      return { 
        status: false, 
        msg: '该记录不存在' 
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValueDraft/rollback")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        configId: 10000000003,
        draftId: 10000000054,
      });

    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "该记录不存在");
  });
});
