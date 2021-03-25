import { Service } from 'egg';
import { DatabaseResponse } from '../interface';

/**
 * Database Service
 */
export default class Database extends Service {

  /**
   * 通用创建
   * 
   * @param {*} model
   * @param {object} data 
   * @returns {Promise<DatabaseResponse>} 
   * @memberof Database
   */
  public async create(model: any, data: object): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'create',
      model: model.name
    });
    const res = await model.create(data);
    if (res) {
      return {
        status: true, 
        data: res.dataValues
      };
    } else {
      return {
        status: false, 
        msg: "创建失败"
      };
    }
  }
  /**
   * 通用更新
   * 
   * @param {*} model 
   * @param {object} condition 
   * @param {object} data 
   * @returns {Promise<DatabaseResponse>} 
   * @memberof Database
   */
  public async update(model: any, condition: object, data: any): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'update',
      model: model.name,
      condition,
    });
    try {
      const res = await model.update({ ...data, updateTime: Date.now() }, {
        where: {
          ...condition,
        }
      });
      if (res) {
        const record = await this.findOne(model, condition);
        return {
          status: true, 
          data: record.data
        };
      }
      throw new Error('');
    } catch(err) {
      return {
        status: false, 
        msg: "更新失败"
      };
    }
  }
  /**
   * 通用逻辑删除
   * 
   * @param {*} model 
   * @param {object} condition 
   * @returns {Promise<DatabaseResponse>} 
   * @memberof Database
   */
  public async delete(model: any, condition: object): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'delete',
      model: model.name,
      condition,
    });
    try {
      const res = await model.update({ isDel: 1, updateTime: Date.now() }, {
        where: {
          ...condition,
        }
      });
      if (res) {
        return {
          status: true, 
          data: res.dataValues
        };
      }
      throw new Error('');
    } catch(err) {
      return {
        status: false, 
        msg: "删除失败"
      };
    }
  }
  /**
   * 通用查询全部数据
   * 
   * @param {*} model 
   * @param {object} condition
   * @returns 
   * @memberof Database
   */
  public async find(model: any, condition: object = {}): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'find',
      model: model.name,
      condition,
    });
    const data = await model.findAll({
      where: { ...condition, isDel: 0 },
      order: [
        ['updateTime', 'DESC'],
        ['createTime', 'DESC']
      ],
    });

    if (data) {
      let dataValues = (data || []).map(d => {
        return d.dataValues;
      });

      return {
        status: true,
        data: dataValues,
        total: dataValues.length
      };
    }

    return {
      status: false,
      msg: '查询异常',
    };
  }
  /**
   * 通用查询单条记录
   * 
   * @param {*} model 
   * @param {object} condition
   * @returns {Promise<DatabaseResponse>} 
   * @memberof Database
   */
  public async findOne(model: any, condition: object = {}): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'findOne',
      model: model.name,
      condition,
    });
    const data = await model.findOne({
      where: {
        ...condition,
        isDel: 0
      }
    });

    if (data) {
      return {
        status: true,
        data: data.dataValues
      };
    }

    return {
      status: false,
      msg: '查询异常',
    };
  }
  /**
   * 通用分页查询
   * 
   * @param {*} model 
   * @param {object} condition
   * @param {number} pageIndex
   * @param {number} pageSize
   * @returns {Promise<DatabaseResponse>} 
   * @memberof Database
   */
  public async pagingFind(model: any, condition: object = {}, pageSize: number, pageIndex: number): Promise<DatabaseResponse> {
    this.ctx.app.logger.info('res=%j', {
      user: this.ctx.userInfo?.username,
      dbOpType: 'pagingFind',
      model: model.name,
      condition,
    });
    let res = await model.findAndCountAll({
      where: { ...condition, isDel: 0 },
      order: [
        ['updateTime', 'DESC'],
        ['createTime', 'DESC']
      ],
      limit: Number(pageSize),
      offset: Number(pageSize) * (Number(pageIndex) - 1)
    });

    if (res.rows) {
      res.rows = (res.rows || []).map(d => {
        return d.dataValues;
      });

      return {
        status: true,
        data: res.rows,
        total: res.count
      };
    }

    return {
      status: false,
      msg: '分页异常',
    };
  }
}
