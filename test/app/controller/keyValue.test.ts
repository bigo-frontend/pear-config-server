import bigoMock from "../../global";

// TESTS=test/app/controller/keyValue.test.ts npm test
describe("json配置单测", () => {
  it("新增json配置-成功", async () => {
    bigoMock.app.mockService("keyValue", "create", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-09T06:51:22.822Z",
          updateTime: "2021-03-09T06:51:22.822Z",
          isDel: 0,
          _id: 10000000003,
          title: "嘉年华主会场",
          tags: "bigolive,likee",
          config:
            '{"pageTitle":"2021嘉年华主会场","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          status: "draft",
          author: "admin",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValue")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        title: "嘉年华主会场",
        tags: ["bigolive", "likee"],
        config: {
          pageTitle: "2021嘉年华主会场",
          beginTime: "2021-03-09T04:22:15.970Z",
          endTime: "2021-04-09T04:22:15.970Z",
        },
        status: "draft",
        envId: "10000000002",
        template: "10000000002",
        author: "admin",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.title === "嘉年华主会场");
  });

  it("新增json配置-失败", async () => {
    bigoMock.app.mockService("keyValue", "create", () => {
      return {
        status: false,
        msg: "创建失败",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValue")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        title: "嘉年华主会场",
        tags: ["bigolive", "likee"],
        config: {
          pageTitle: "2021嘉年华主会场",
          beginTime: "2021-03-09T04:22:15.970Z",
          endTime: "2021-04-09T04:22:15.970Z",
        },
        status: "draft",
        env: "10000000002",
        template: "10000000002",
        author: "admin",
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "创建失败");
  });

  it("更新json配置-成功", async () => {
    bigoMock.app.mockService("keyValue", "update", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig: null,
          publishConfig: null,
          grayCdnUrl: null,
          cdnUrl: null,
          status: "reedit",
          env: null,
          template: null,
          author: "admin",
          editor: null,
          tags: "bigolive,likee",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T06:58:11.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/keyValue/10000000003")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        title: "嘉年华主会场2",
        tags: ["bigolive", "likee"],
        config: {
          pageTitle: "2021嘉年华主会场2",
          beginTime: "2021-03-09T04:22:15.970Z",
          endTime: "2021-04-09T04:22:15.970Z",
        },
        env: "10000000002",
        template: "10000000002",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.title === "嘉年华主会场2");
  });

  it("删除json配置-成功", async () => {
    bigoMock.app.mockService("keyValue", "remove", () => {
      return {
        status: true,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .delete("/keyValue/10000000003")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    bigoMock.assert(result.body.status === true);
  });

  it("获取标签列表-成功", async () => {
    bigoMock.app.mockService("keyValue", "tags", () => {
      return { status: true, data: [{ title: "多语言" }] };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/keyValue/tags")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    bigoMock.assert(result.body.status === true);
  });

  it("更新json配置的标签-成功", async () => {
    bigoMock.app.mockService("keyValue", "updateTags", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig: null,
          publishConfig: null,
          grayCdnUrl: null,
          cdnUrl: null,
          status: "reedit",
          env: null,
          template: null,
          author: "admin",
          editor: null,
          tags: "hello",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T09:41:00.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/keyValue/10000000003/tags")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        tags: ["hello"],
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.tags === "hello");
  });

  it("更新json配置的作者-成功", async () => {
    bigoMock.app.mockService("keyValue", "updateEditors", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig: null,
          publishConfig: null,
          grayCdnUrl: null,
          cdnUrl: null,
          status: "reedit",
          env: null,
          template: null,
          author: "admin",
          editor: "admin,superAdmin",
          tags: "hello",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T09:41:00.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/keyValue/10000000003/editors")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        editors: ["admin", "superAdmin"],
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.editor === "admin,superAdmin");
  });

  it("复制json配置-成功", async () => {
    bigoMock.app.mockService("keyValue", "copy", () => {
      return {
        status: true,
        data: {
          _id: 10000000004,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig: null,
          publishConfig: null,
          grayCdnUrl: null,
          cdnUrl: null,
          status: "reedit",
          env: null,
          template: null,
          author: "admin",
          editor: "admin,superAdmin",
          tags: "hello",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T09:41:00.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValue/copy")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        _id: "10000000003",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data._id === 10000000004);
  });

  it("发布json配置到灰度-成功", async () => {
    bigoMock.app.mockService("keyValue", "updateStatus", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          title: "嘉年华主会场2",
          config:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          grayConfig:
            '{"pageTitle":"2021嘉年华主会场2","beginTime":"2021-03-09T04:22:15.970Z","endTime":"2021-04-09T04:22:15.970Z"}',
          publishConfig: null,
          grayCdnUrl: "http://127.0.0.1:9005/public/json/gray-10000000003.json",
          cdnUrl: null,
          status: "gray",
          env: null,
          template: null,
          author: "admin",
          editor: null,
          tags: "hello",
          createTime: "2021-03-09T06:51:22.000Z",
          updateTime: "2021-03-09T10:24:42.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/keyValue/updateStatus")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        _id: "10000000003",
        status: "gray",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(
      result.body.data.grayCdnUrl ===
        "http://127.0.0.1:9005/public/json/gray-10000000003.json"
    );
  });

  it("获取json配置分页-成功", async () => {
    bigoMock.app.mockService("keyValue", "getList", () => {
      return {
        status: true,
        data: [
          {
            _id: 10000000007,
            title: "嘉年华主会场",
            envId: 10000000002,
            formId: null,
            config: [Object],
            grayCdnUrl: null,
            cdnUrl: null,
            status: "draft",
            tags: [Array],
            author: "admin",
            editors: [],
            lastEditTime: "2021-03-09T11:10:03.000Z",
          },
          {
            _id: 10000000006,
            title: "嘉年华主会场",
            envId: 10000000002,
            formId: null,
            config: [Object],
            grayCdnUrl: null,
            cdnUrl: null,
            status: "draft",
            tags: [Array],
            author: "admin",
            editors: [],
            lastEditTime: "2021-03-09T11:09:52.000Z",
          },
        ],
        total: 2,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get(
        "/keyValue?envId=10000000002&searchKey=&tag=&related=all&pageSize=8&pageIndex=1"
      );
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 2);
  });

  it("获取json配置详情-成功", async () => {
    bigoMock.app.mockService("keyValue", "getDetail", () => {
      return {
        pageTitle: "2021嘉年华主会场",
        beginTime: "2021-03-09T04:22:15.970Z",
        endTime: "2021-04-09T04:22:15.970Z",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/config/draft/10000000007");
    console.log(result.body);
    bigoMock.assert(result.body.pageTitle === "2021嘉年华主会场");
  });
});
