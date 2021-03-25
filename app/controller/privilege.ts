import { Controller } from 'egg';

/**
 * 权限管理（开源版本暂未实现）
 */
export default class PrivilegeController extends Controller {

  public async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.body = await ctx.service.privilege.create(params);
    return ctx.body;
  }

  public async update() {
    const { ctx } = this;
    const {id} = ctx.params;
    const params = ctx.request.body;
    ctx.body = await ctx.service.privilege.update({_id: id, ...params});
    return ctx.body;
  }

  public async remove() {
    const { ctx } = this;
    const {id} = ctx.params;
    ctx.body = await ctx.service.privilege.remove({_id: id});
    return ctx.body;
  }

  public async list() {
    const { ctx } = this;
    const { pageSize = 8, pageIndex = 1, ...rest } = ctx.query;
    ctx.body = await ctx.service.privilege.getList(Number(pageSize), Number(pageIndex), rest);
    return ctx.body;
  }
}
