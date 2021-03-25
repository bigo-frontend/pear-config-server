import bigoMock from "../../global";

// TESTS=test/app/controller/privilege.test.ts npm test
describe("权限管理单测", () => {
  it("新增权限分类-成功", async () => {
    bigoMock.app.mockService("privilege", "create", () => {
      return {
        status: true,
        data: {
          createTime: "2021-03-10T02:55:40.281Z",
          updateTime: "2021-03-10T02:55:40.281Z",
          isDel: 0,
          _id: 10000000001,
          privilegeType: "publish",
          role: "superAdmin|manager|developer",
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/privilege")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        privilegeType: "publish",
        role: ["superAdmin", "manager", "developer"],
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.privilegeType === "publish");
  });

  it("新增已存在权限分类-失败", async () => {
    bigoMock.app.mockService("privilege", "create", () => {
      return {
        status: false,
        msg: "该权限类型已存在",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .post("/privilege")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        privilegeType: "publish",
        role: ["superAdmin", "manager", "developer"],
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "该权限类型已存在");
  });

  it("更新权限分类-成功", async () => {
    bigoMock.app.mockService("privilege", "update", () => {
      return {
        status: true,
        data: {
          _id: 10000000001,
          privilegeType: "publish",
          privilegeDesc: null,
          role: "superAdmin|manager",
          createTime: "2021-03-10T02:55:40.000Z",
          updateTime: "2021-03-10T03:05:35.000Z",
          isDel: 0,
        },
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/privilege/10000000001")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        privilegeType: "publish",
        role: ["superAdmin", "manager"],
      });
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.data.role === "superAdmin|manager");
  });

  it("更新权限分类缺少privilegeType入参-失败", async () => {
    bigoMock.app.mockService("privilege", "update", () => {
      return {
        status: false,
        msg: "出错啦~",
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .put("/privilege/10000000001")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        role: ["superAdmin", "manager"],
      });
    bigoMock.assert(result.body.status === false);
    bigoMock.assert(result.body.msg === "出错啦~");
  });

  it("删除权限分类-成功", async () => {
    bigoMock.app.mockService("privilege", "remove", () => {
      return {
        status: true,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .delete("/privilege/10000000001");
    bigoMock.assert(result.body.status === true);
  });

  it("查询权限分类分页-成功", async () => {
    bigoMock.app.mockService("privilege", "getList", () => {
      return {
        status: true,
        data: [
          {
            _id: 10000000002,
            privilegeType: "publish",
            privilegeDesc: null,
            role: [Array],
            lastEditTime: "2021-03-10T03:21:58.000Z",
          },
        ],
        total: 1,
      };
    });
    const result = await bigoMock.app
      .httpRequest()
      .get("/privilege?pageSize=8&pageIndex=1");
    bigoMock.assert(result.body.status === true);
    bigoMock.assert(result.body.total === 1);
  });
});
