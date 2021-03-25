import { Controller } from 'egg';

/**
 * k-v配置草稿（json）
 */
export default class KeyValueController extends Controller {

  public async list() {
    const { ctx } = this;
    const { pageSize = 8, pageIndex = 1, ...rest } = ctx.query;
    ctx.body = await ctx.service.keyValueDraft.getList(Number(pageSize), Number(pageIndex), rest);
    return ctx.body;
  }

  public async rollback() {
    const { ctx } = this;
    const { configId, draftId } = ctx.request.body;
    ctx.body = await ctx.service.keyValueDraft.rollback(configId, draftId);
    return ctx.body;
  }
}
