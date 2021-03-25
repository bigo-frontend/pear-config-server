import { Controller } from 'egg';

/**
 * k-v配置（json）
 */
export default class KeyValueController extends Controller {

  public async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res: any = await ctx.service.keyValue.create(params);
    if (res.status) {
      await ctx.service.keyValueDraft.create({
        configId: res.data._id,
        config: params.config,
        formId: params.formId,
      });
    }
    ctx.body = res;
    return ctx.body;
  }

  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const params = ctx.request.body;
    const res = await ctx.service.keyValue.update({ _id: id, ...params });
    if (res.status) {
      await ctx.service.keyValueDraft.create({
        configId: id,
        config: params.config,
        formId: params.formId,
      });
    }
    ctx.body = res;
    return ctx.body;
  }

  public async remove() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.keyValue.remove({ _id: id });
    return ctx.body;
  }

  public async copy() {
    const { ctx } = this;
    const { _id } = ctx.request.body;
    ctx.body = await ctx.service.keyValue.copy({ _id });
    return ctx.body;
  }

  public async updateStatus() {
    const { ctx } = this;
    const { _id, status } = ctx.request.body;
    ctx.body = await ctx.service.keyValue.updateStatus({ _id }, status);
    return ctx.body;
  }

  public async list() {
    const { ctx } = this;
    const {
      pageSize = 8,
      pageIndex = 1,
      searchKey,
      tag,
      related,
      envId,
      ...rest
    } = ctx.query;
    ctx.body = await ctx.service.keyValue.getList(
      Number(pageSize),
      Number(pageIndex),
      searchKey,
      tag,
      related,
      { ...rest, env: envId }
    );
    return ctx.body;
  }

  public async detail() {
    const { ctx } = this;
    const { id, mode } = ctx.params;
    ctx.body = await ctx.service.keyValue.getDetail(id, mode);
    return ctx.body;
  }

  public async updateTags() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { tags } = ctx.request.body;
    ctx.body = await ctx.service.keyValue.updateTags(id, tags);
    return ctx.body;
  }

  public async updateEditors() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { editors } = ctx.request.body;
    ctx.body = await ctx.service.keyValue.updateEditors(id, editors);
    return ctx.body;
  }

  public async tagList() {
    const { ctx } = this;
    // ctx.body = await ctx.service.keyValue.tags();
    ctx.body = {
      status: true,
      data: [
        {
          title: '活动',
        },
        {
          title: '系统配置',
        },
      ],
    };
    return ctx.body;
  }
}
