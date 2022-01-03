import { Controller } from 'egg';

export default class KeyValueController extends Controller {

  public async list() {
    const { ctx } = this;

    const { pageSize, pageIndex, ...rest } = ctx.query;

    ctx.body = await ctx.service.records.getList(pageSize, pageIndex, rest);

    return ctx.body;
  }

  public async rollback() {
    const { ctx } = this;

    const { configId, recordId } = ctx.request.body;

    ctx.body = await ctx.service.records.rollback(configId, recordId);

    return ctx.body;
  }

  public async detail() {
    const { ctx } = this;

    const { id, mode } = ctx.params;

    ctx.body = await ctx.service.records.getDetail(id, mode);

    return ctx.body;
  }
}
