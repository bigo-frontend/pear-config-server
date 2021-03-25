import { Controller } from 'egg';

export default class BaseController extends Controller {
  /**
   * 成功
   * @param data 响应数据
   */
  success(data) {
    return this.ctx.body = {
      success: true,
      ...data,
    };
  }

  /**
   * 失败
   * @param data 响应数据
   */
  fail(data) {
    return this.ctx.body = {
      success: false,
      ...data,
    };
  }
}
