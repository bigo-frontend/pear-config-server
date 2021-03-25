import { Service } from 'egg';
import { Response } from '../interface';

/**
 * Privilege Service
 */
export default class Privilege extends Service {

  public async create(options: {_id?: any, privilegeType: string, role: any}):Promise<Response> {
    let { ctx } = this;

    if (options.privilegeType) {
      const res = await ctx.service.db.findOne(ctx.model.Privilege, { privilegeType: options.privilegeType });
  
      if (res.data) {
        return {
          status: false,
          msg: '该权限类型已存在',
        };
      }
    }

    options.role = options.role.join('|');
    return await ctx.service.db.create(ctx.model.Privilege, options);
  }

  public async update(options: {_id: string, privilegeType: string, role: any}):Promise<Response> {
    let { ctx } = this;
    let { Op } = this.app.Sequelize;

    let {_id, ...updateData} = options;

    const res = await ctx.service.db.findOne(ctx.model.Privilege, {
      privilegeType: options.privilegeType,
      id: {
        [Op.ne]: _id
      }
    });

    if (res.data) {
      return {
        status: false,
        msg: '该权限类型已存在',
      };
    } else {
      updateData.role = updateData.role.join('|');
      return await ctx.service.db.update(ctx.model.Privilege, { id: _id }, updateData);
    }
  }

  public async remove(condition: object):Promise<Response> {
    let { ctx } = this;
    
    return await ctx.service.db.delete(ctx.model.Privilege, condition);
  }

  public async getList(pageSize?: number, pageIndex?: number, condition?: object):Promise<Response> {
    let { ctx } = this;

    let result: Response = { status: false };

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(ctx.model.Privilege, condition, pageSize, pageIndex);
    } else {
      result = await ctx.service.db.find(ctx.model.Privilege, condition);
    }

    if (result.status) {
      result.data = (result.data || []).map(d => {
        const { _id, privilegeType, privilegeDesc, role, createTime, updateTime } = d;
        return { _id, privilegeType, privilegeDesc, role: role.split('|'), lastEditTime: updateTime || createTime };
      });
    }
    return result;
  }
}
