import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import * as path from 'path';
import * as fs from 'fs';

// https://eggjs.org/zh-cn/core/unittest.html#mock
class BigoMock {
  app;
  ctx;
  assert = assert; // 挂载assert
  async before() {
    console.log('hello bigoMock');
    this.app = app;
    await app.ready();
    this.ctx = app.mockContext();
    return;
  }
  /**
   * 模拟 Service 方法返回值
   * @param service 方法类
   * @param methodName 方法名
   * @param fileName 文件名（状态）
   */
  mockServiceByData(service, methodName, fileName) {
    let serviceClassName = '';
    if (typeof service === 'string') {
      const arr = service.split('.');
      serviceClassName = arr[arr.length - 1];
    }
    const servicePaths = path.join(serviceClassName, methodName);
    this.app.mockService(service, methodName, () => {
      return this.getMockData(servicePaths, fileName);
    });
  }
  /**
   * 获取本地test/mockData的mock数据
   * @param folder 文件夹
   * @param fileName 文件名
   */
  getMockData(folder, fileName) {
    return this.getJson(folder, fileName);
  }
  /**
   * 约定从test/mockData/service/methodName/fileName.json获取数据
   * @param folder 文件夹
   * @param fileName 文件名
   */
  getJson(folder, fileName) {
    // 默认追加json后缀
    console.log(path.extname(fileName));
    if (!path.extname(fileName)) {
      fileName = fileName + '.json';
    }
    const fullPaths = path.join(process.cwd(), 'test/mockData', folder, fileName);
    return fs.readFileSync(fullPaths, 'utf-8');
  }
}

const bigoMock = new BigoMock();
(async function() {
  await bigoMock.before();
})();

export default bigoMock;
