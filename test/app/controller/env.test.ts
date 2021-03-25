import bigoMock from "../../global";

// TESTS=test/app/controller/env.test.ts npm test
describe("空间分类单测", () => {
  it("新增空间-成功", async () => {
    bigoMock.app.mockService("env", "create", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-09T03:45:17.531Z",
          updateTime: "2021-03-09T03:45:17.531Z",
          isDel: 0,
          _id: 10000000002,
          envName: "bigo",
          description: "bigo-form",
          cdnDomain: "https://bigo.sg",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "bigo",
        desc: "bigo-form",
        cdnDomain: "https://bigo.sg",
      });
    bigoMock.assert(result.body.status === true);
  });

  it("新增空间-失败", async () => {
    bigoMock.app.mockService("env", "create", () => {
      return {
        status: false,
        msg: "该空间已存在",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "bigo",
        desc: "bigo-form",
        cdnDomain: "https://bigo.sg",
      });
    bigoMock.assert(result.body.status === false);
  });

  it("更新空间-成功", async () => {
    bigoMock.app.mockService("env", "update", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-09T03:45:17.531Z",
          updateTime: "2021-03-09T03:45:17.531Z",
          isDel: 0,
          _id: 10000000002,
          envName: "bigo",
          description: "bigo-form2",
          cdnDomain: "https://bigo.sg",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "bigo",
        desc: "bigo-form2",
        cdnDomain: "https://bigo.sg",
      });
    bigoMock.assert(result.body.data.description === "bigo-form2");
  });

  it("更新空间-失败", async () => {
    bigoMock.app.mockService("env", "update", () => {
      return {
        status: false,
        msg: "更新失败",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "bigo",
        desc: "bigo-form2",
        cdnDomain: "https://bigo.sg",
      });
    bigoMock.assert(result.body.msg === "更新失败");
  });

  it("空间分页-成功", async () => {
    bigoMock.app.mockService("env", "getList", () => {
      return {
        status: true,
        data: [
          {
            _id: 10000000002,
            name: "bigo2",
            desc: "bigo-form",
            cdnDomain: "https://bigo.sg",
          },
          {
            _id: 10000000001,
            name: "bigo",
            desc: "bigo-form",
            cdnDomain: "https://bigo.sg",
          },
        ],
        total: 2,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        pageSize: 10,
        pageIndex: 1,
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 2);
  });

  it("空间分页-失败", async () => {
    bigoMock.app.mockService("env", "getList", () => {
      return {
        status: false,
        msg: '分页异常',
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/env")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        pageSize: 10,
        pageIndex: 1,
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "分页异常");
  });
});
