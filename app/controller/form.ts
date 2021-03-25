import { Controller } from 'egg';

/**
 * 表单模板配置（json-schema）
 */
export default class FormController extends Controller {

  public async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.body = await ctx.service.form.create(params);
    return ctx.body;
  }

  public async update() {
    const { ctx } = this;
    const {id} = ctx.params;
    const params = ctx.request.body;
    ctx.body = await ctx.service.form.update({_id: id, ...params});
    return ctx.body;
  }

  public async remove() {
    const { ctx } = this;
    const {id} = ctx.params;
    ctx.body = await ctx.service.form.remove({_id: id});
    return ctx.body;
  }

  public async list() {
    const { ctx } = this;
    const { pageSize = 8, pageIndex = 1, ...rest } = ctx.query;
    ctx.body = await ctx.service.form.getList(Number(pageSize), Number(pageIndex), rest);
    return ctx.body;
  }

  public async detail() {
    const { ctx } = this;
    const {id} = ctx.params;
    const {formKey} = ctx.request.body;
    let condition: any = {}
    if (id) {
      condition._id = id;
    }
    if (formKey) {
      condition.formKey = formKey;
    }
    ctx.body = await ctx.service.form.getDetail(condition);
    return ctx.body;
  }
}
