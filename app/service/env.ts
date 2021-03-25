import { Service } from 'egg';
import { Response } from '../interface';

/**
 * Env Service
 */
export default class Env extends Service {

  public async create(options: {name: string, desc: string, cdnDomain: string}): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.Env, { envName: options.name });

    if (res.data) {
      return {
        status: false,
        msg: '该空间已存在',
      };
    } else {
      return await ctx.service.db.create(ctx.model.Env, {envName: options.name, description: options.desc, cdnDomain: options.cdnDomain});
    }
  }

  public async update(options: {name: string, desc: string, cdnDomain: string}): Promise<Response> {
    let { ctx } = this;
    
    return await ctx.service.db.update(ctx.model.Env, { envName: options.name }, { description: options.desc, cdnDomain: options.cdnDomain });
  }

  public async getList(pageSize?: number, pageIndex?: number): Promise<Response> {
    let { ctx } = this;

    let result: Response = { status: false };

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(ctx.model.Env, {}, pageSize, pageIndex);
    } else {
      result = await ctx.service.db.find(ctx.model.Env, {});
    }

    if (result.status) {
      result.data = (result.data || []).map(d => {
        const { _id, envName, description, cdnDomain } = d;
        return { _id, name: envName, desc: description, cdnDomain };
      });
    }

    return result;
  }
}
