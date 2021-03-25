import bigoMock from "../../global";

// TESTS=test/app/controller/material.test.ts npm test
describe("文件上传单测", () => {
  it("图片上传成功-成功", async () => {
    const result = await bigoMock.app
      .httpRequest()
      .post("/material/upload")
      .attach("file", "test/go.png");
    console.log(result.body);
    bigoMock.assert(result.body.status === true);
  });
});
