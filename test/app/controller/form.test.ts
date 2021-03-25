import bigoMock from "../../global";

// TESTS=test/app/controller/form.test.ts npm test
describe("json-schema单测", () => {

  it("新增json-schema-成功", async () => {
    bigoMock.app.mockService("form", "create", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-09T04:22:15.970Z",
          updateTime: "2021-03-09T04:22:15.970Z",
          isDel: 0,
          _id: 10000000001,
          formKey: "bigo通用表单配置",
          envId: 10000000002,
          jsonSchema: { type: "object", properties: [Object] },
          author: "admin",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/form")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        formKey: "bigo通用表单配置",
        envId: 10000000002,
        jsonSchema: {
          type: "object",
          properties: {
            select: {
              type: "string",
              enum: ["1", "2", "3", "4"],
              title: "Select",
              required: true,
            },
          },
        },
        author: "admin",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.formKey === "bigo通用表单配置");
  });

  it("新增json-schema-失败", async () => {
    bigoMock.app.mockService("form", "create", () => {
      return {
        status: false,
        msg: "该模板标识已存在",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/form")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        formKey: "bigo通用表单配置",
        envId: 10000000002,
        jsonSchema: {
          type: "object",
          properties: {
            select: {
              type: "string",
              enum: ["1", "2", "3", "4"],
              title: "Select",
              required: true,
            },
          },
        },
        author: "admin",
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "该模板标识已存在");
  });

  it("更新json-schema-成功", async () => {
    bigoMock.app.mockService("form", "update", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-09T04:22:15.970Z",
          updateTime: "2021-03-09T04:22:15.970Z",
          isDel: 0,
          _id: 10000000001,
          formKey: "bigo通用表单配置3",
          envId: 10000000002,
          jsonSchema: { type: "object", properties: [Object] },
          author: "admin",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/form/10000000001")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        formKey: "bigo通用表单配置3",
        envId: 10000000002,
        jsonSchema: {
          type: "object",
          properties: {
            select: {
              type: "string",
              enum: ["1", "2", "3", "4"],
              title: "Select",
              required: true,
            },
          },
        },
        author: "admin",
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.formKey === "bigo通用表单配置3");
  });

  it("更新json-schema-失败", async () => {
    bigoMock.app.mockService("form", "update", () => {
      return {
        status: false,
        msg: "该模板标识已存在",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/form/10000000001")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        formKey: "bigo通用表单配置3",
        envId: 10000000002,
        jsonSchema: {
          type: "object",
          properties: {
            select: {
              type: "string",
              enum: ["1", "2", "3", "4"],
              title: "Select",
              required: true,
            },
          },
        },
        author: "admin",
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "该模板标识已存在");
  });

  it("删除json-schema-成功", async () => {
    bigoMock.app.mockService("form", "remove", () => {
      return {
        status: true,
      };
    });
    const result = await bigoMock.app.httpRequest().delete("/form/10000000001");
    bigoMock.assert(result.body.status === true);
  });

  it("获取json-schema分页-成功", async () => {
    bigoMock.app.mockService("form", "getList", () => {
      return {
        status: true,
        data: [
          {
            _id: 10000000003,
            formKey: "bigo通用表单配置2",
            jsonSchema: [Object],
          },
          {
            _id: 10000000002,
            formKey: "bigo通用表单配置",
            jsonSchema: [Object],
          },
        ],
        total: 2,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/form")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        envId: 10000000002,
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 2);
  });

  it("获取json-schema详情-成功", async () => {
    bigoMock.app.mockService("form", "getDetail", () => {
      return {
        status: true,
        data: {
          _id: 10000000003,
          formKey: "bigo通用表单配置2",
          jsonSchema: { type: "object", properties: [Object] },
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/form/10000000003")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.formKey === "bigo通用表单配置2");
  });
});
