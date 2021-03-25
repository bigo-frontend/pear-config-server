import { Controller } from 'egg';

/**
 * 业务空间
 */
export default class EnvController extends Controller {
  public async create() {
    const { ctx } = this;
    let { name, desc, cdnDomain } = ctx.request.body;
    if (!cdnDomain.endsWith('/')) {
      cdnDomain = cdnDomain + '/';
    }
    ctx.body = await ctx.service.env.create({ name, desc, cdnDomain });
    return ctx.body;
  }

  public async update() {
    const { ctx } = this;
    let { name, desc, cdnDomain } = ctx.request.body;
    if (!cdnDomain.endsWith('/')) {
      cdnDomain = cdnDomain + '/';
    }
    ctx.body = await ctx.service.env.update({ name, desc, cdnDomain });
    return ctx.body;
  }

  public async list() {
    const { ctx } = this;
    const { pageSize, pageIndex } = ctx.request.body;
    ctx.body = await ctx.service.env.getList(pageSize, pageIndex);
    return ctx.body;
  }
}
