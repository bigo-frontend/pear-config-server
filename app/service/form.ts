import { Service } from 'egg';
import { Response } from '../interface';

/**
 * Form Service
 */
export default class Form extends Service {

  public async create(options: {formKey: string, envId: number, jsonSchema: any, author?: string}):Promise<Response> {
    let { ctx } = this;

    if (options.formKey) {
      const res = await ctx.service.db.findOne(ctx.model.Form, { formKey: options.formKey, envId: options.envId });
  
      if (res.data) {
        return {
          status: false,
          msg: '该模板标识已存在',
        };
      }
    }

    options.jsonSchema = JSON.stringify(options.jsonSchema);
    options.author = ctx.userInfo.username;
    const res: any = await ctx.service.db.create(ctx.model.Form, options);
    if (res.status) {
      res.data.jsonSchema = JSON.parse(res.data.jsonSchema);
    }
    return res;
  }

  public async update(options: {_id: string, formKey: string, envId: number, jsonSchema: any}):Promise<Response> {
    let { ctx } = this;
    let { Op } = this.app.Sequelize;

    let {_id, ...updateData} = options;

    const res = await ctx.service.db.findOne(ctx.model.Form, {
      formKey: options.formKey,
      envId: options.envId,
      id: {
        [Op.ne]: _id
      }
    });

    if (res.data) {
      return {
        status: false,
        msg: '该模板标识已存在',
      };
    } else {
      updateData.jsonSchema = JSON.stringify(updateData.jsonSchema);
      return await ctx.service.db.update(ctx.model.Form, { id: _id }, updateData);
    }
  }

  public async remove(condition: object):Promise<Response> {
    let { ctx } = this;
    
    return await ctx.service.db.delete(ctx.model.Form, condition);
  }

  public async getList(pageSize?: number, pageIndex?: number, condition?: object):Promise<Response> {
    let { ctx } = this;
    let { Op } = this.app.Sequelize;

    let result: Response = { status: false };

    let searchCondition = {
      formKey: {
        [Op.ne]: 'NULL'
      },
      ...condition
    }

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(ctx.model.Form, searchCondition, pageSize, pageIndex);
    } else {
      result = await ctx.service.db.find(ctx.model.Form, searchCondition);
    }

    if (result.status) {
      result.data = (result.data || []).map(d => {
        const { _id, formKey, jsonSchema } = d;
        return { _id, formKey, jsonSchema: JSON.parse(jsonSchema) };
      });
    }
    return result;
  }

  public async getDetail(condition: object):Promise<Response> {
    let { ctx } = this;

    let result: Response = { status: false };

    const res = await ctx.service.db.findOne(ctx.model.Form, condition);

    if (res.data) {
      const { _id, formKey, jsonSchema } = res.data;
      result.status = true;
      result.data = { _id, formKey, jsonSchema: JSON.parse(jsonSchema) };
    }
    return result;
  }
}
