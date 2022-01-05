import { Service } from 'egg';
import { Response } from '../interface';

export default class Records extends Service {
  /**
   * 发布记录列表
   *
   * @param pageSize
   * @param pageIndex
   * @param condition
   */
  public async getList(pageSize?: number | string, pageIndex?: number | string, condition?: object):Promise<Response> {
    const { ctx } = this;

    let result: Response = { status: false };

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(ctx.model.Records, condition, pageSize, pageIndex);
    } else {
      result = await ctx.service.db.find(ctx.model.Records, condition);
    }

    if (result.status) {
      result.data = (result.data || []).map(d => {
        const { _id, config, configRef, createTime } = d;
        return { _id, config: JSON.parse(config), configId: configRef, lastEditTime: createTime };
      });
    }
    return result;
  }

  /**
   * 回滚key-value配置
   *
   * @param configId
   * @param recordId
   */
  public async rollback(configId: string, recordId: string):Promise<Response> {
    const { ctx } = this;

    const kvRes = await ctx.service.db.findOne(ctx.model.KeyValue, { _id: configId });

    const recordsRes = await ctx.service.db.findOne(ctx.model.Records, { _id: recordId });

    if (!kvRes.data || !recordsRes.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    }
    return ctx.service.db.update(ctx.model.KeyValue, { _id: configId }, {
      ...kvRes.data,
      status: 'reedit',
      template: recordsRes.data.template,
      config: recordsRes.data.config,
    });

  }

  /**
   * 获取发布记录详情
   *
   * @param {string} _id
   * @param {string} mode
   * @return {*}  {(Promise<Response | string>)}
   * @memberof Records
   */
  public async getDetail(_id: string, mode: string):Promise<Response | string> {
    const { ctx } = this;
    const type = mode === 'prod' ? 1 : 0;

    const res = await ctx.service.db.findOne(ctx.model.Records, { _id, type });

    if (res.data) {
      const formatConfig = JSON.parse(res.data.config);
      return formatConfig;
    }

    return {
      status: false,
      msg: '未找到配置',
    };
  }
}
