import { Service } from 'egg';
import { Response } from '../interface';

/**
 * KeyValueDraft Service
 */
export default class KeyValueDraft extends Service {

  /**
   * 创建key-value配置草稿
   * 
   * @param options 
   */
  public async create(options: any):Promise<Response> {
    let { ctx } = this;
    return await ctx.service.db.create(ctx.model.KeyValueDraft, {
      configRef: options.configId,
      template: options.formId,
      config: JSON.stringify(options.config),
      author: ctx.userInfo.username
    });
  }

  /**
   * 获取key-value草稿列表
   * 
   * @param pageIndex 
   * @param pageSize 
   * @param condition 
   */
  public async getList(pageSize?: number, pageIndex?: number, condition?: object):Promise<Response> {
    let { ctx } = this;

    let result: Response = { status: false };

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(ctx.model.KeyValueDraft, condition, pageSize, pageIndex);
    } else {
      result = await ctx.service.db.find(ctx.model.KeyValueDraft, condition);
    }

    if (result.status) {
      result.data = (result.data || []).map(d => {
        const { _id, config, configRef, createTime} = d;
        return { _id, config: JSON.parse(config), configId: configRef, lastEditTime: createTime };
      });
    }
    return result;
  }

  /**
   * 回滚key-value配置
   * 
   * @param configId 
   * @param draftId 
   */
  public async rollback(configId: string, draftId: string):Promise<Response> {
    let { ctx } = this;

    const kvRes = await ctx.service.db.findOne(ctx.model.KeyValue, { _id: configId });

    const draftRes = await ctx.service.db.findOne(ctx.model.KeyValueDraft, { _id: draftId });

    if (!kvRes.data || !draftRes.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      return ctx.service.db.update(ctx.model.KeyValue, { _id: configId }, {
        ...kvRes.data,
        envId: kvRes.data.env,
        formId: draftRes.data.template,
        config: draftRes.data.config
      })
    }
  }
}
