import { Service } from 'egg';

import { Response } from '../interface';
import { Estatus, Emode } from '@/constant/statusEnum';

/**
 * KeyValue Service
 */
export default class KeyValue extends Service {
  /**
   * 创建key-value配置
   *
   * @param options
   */
  public async create(options: any): Promise<Response> {
    const { ctx } = this;
    return await ctx.service.db.create(ctx.model.KeyValue, {
      title: options.title,
      tags: options.tags.join(','),
      config: JSON.stringify(options.config),
      status: Estatus.DRAFT,
      env: options.envId,
      template: options.formId,
      author: ctx.userInfo.username,
    });
  }

  /**
   * 更新key-value配置
   *
   * @param options
   */
  public async update(options: any): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, {
      _id: options._id,
    });

    if (!res.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      return await ctx.service.db.update(
        ctx.model.KeyValue,
        { _id: options._id },
        {
          title: options.title,
          config: JSON.stringify(options.config),
          status: Estatus.REEDIT,
          // env: options.envId,
          template: options.formId,
        }
      );
    }
  }

  /**
   * 删除key-value配置
   *
   * @param condition
   */
  public async remove(condition: object): Promise<Response> {
    let { ctx } = this;

    return await ctx.service.db.delete(ctx.model.KeyValue, condition);
  }

  /**
   * 复制key-value配置
   *
   * @param condition
   */
  public async copy(condition: object): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, condition);

    if (!res.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      let data = res.data;

      return await ctx.service.db.create(ctx.model.KeyValue, {
        title: data.title,
        tags: data.tags,
        config: data.config,
        status: Estatus.DRAFT,
        env: data.env,
        template: data.template,
        author: ctx.userInfo.username,
      });
    }
  }

  /**
   * 更新配置状态：发布&下线
   *
   * @param condition
   * @param status
   */
  public async updateStatus(
    condition: object,
    status: string
  ): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, condition);

    if (!res.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      const resultData: any = res.data;

      let updateData: any = {
        status,
      };
      if (status === Estatus.GRAY || status === Estatus.ONLINE) {
        // 发布
        updateData = await this.publish(status, resultData);
      }
      if (status === Estatus.OFFLINE) {
        // 下线，当前无实际作用，并不会删除cdn上的文件
        updateData.publishConfig = '';
      }
      // if (!updateData.status) {
      //   return updateData;
      // }
      const updateResult: any = await ctx.service.db.update(
        ctx.model.KeyValue,
        condition,
        updateData
      );
      return updateResult;
    }
  }

  /**
   * 更新配置状态：发布灰度&生产环境
   *
   * @param status
   * @param record
   */
  public async publish(status: string, record: any) {
    let { ctx } = this;
    const { _id: configId, config, env } = record;
    const configData = JSON.parse(config);
    let updateData: any = {
      status,
    };
    let domain = ctx.app.config.domain;
    if (env) {
      const envData = await ctx.service.db.findOne(ctx.model.Env, { _id: env });
      if (envData) {
        domain = envData.data.cdnDomain;
      }
    }
    const fileNamePrefix = status === 'gray' ? 'gray-' : '';
    const filePath = await this.service.file.uploadConifg({
      fileName: `${fileNamePrefix}${configId}.json`,
      config: configData,
    });

    if (status === Estatus.GRAY) {
      updateData.grayConfig = config;
      updateData.grayCdnUrl = domain + filePath;
    } else {
      updateData.publishConfig = config;
      updateData.cdnUrl = domain + filePath;
    }

    ctx.app.logger.info('%j=', {
      user: ctx.userInfo?.username,
      id: configId,
      opType: 'publish',
    });

    return updateData;
  }

  /**
   * 获取key-value列表
   *
   * @param pageIndex
   * @param pageSize
   */
  public async getList(
    pageSize?: number,
    pageIndex?: number,
    searchKey?: string,
    tag?: string,
    related?: string,
    condition?: object
  ): Promise<Response> {
    let { ctx } = this;

    let { Op } = this.app.Sequelize;

    let result: Response = { status: false };

    const searchCondition: any = {
      [Op.and]: [{ ...condition }],
    };

    if (tag) {
      searchCondition[Op.and].push({
        tags: { [Op.regexp]: `(^|,)+${tag}(,|$)+` },
      });
    }

    if (related === 'self') {
      searchCondition[Op.and].push({
        [Op.or]: [
          { author: ctx.userInfo.username },
          // { editor: { [Op.regexp]: `(^|,)+${ctx.userInfo.username}(,|$)+` } },
        ],
      });
    }

    if (searchKey) {
      searchCondition[Op.and].push({
        [Op.or]: [
          { id: { [Op.like]: `%${searchKey}%` } },
          { title: { [Op.like]: `%${searchKey}%` } },
          { author: { [Op.like]: `%${searchKey}%` } },
        ],
      });
    }

    if (pageIndex !== undefined && pageSize !== undefined) {
      result = await ctx.service.db.pagingFind(
        ctx.model.KeyValue,
        searchCondition,
        pageSize,
        pageIndex
      );
    } else {
      result = await ctx.service.db.find(ctx.model.KeyValue, searchCondition);
    }

    if (result.status) {
      result.data = (result.data || []).map(({
        _id,
        title,
        env: envId,
        template: formId,
        config,
        grayCdnUrl,
        cdnUrl,
        status,
        tags,
        author,
        editor,
        createTime,
        updateTime,
      }) => {
        return {
          _id,
          title,
          envId,
          formId,
          config: JSON.parse(config),
          grayCdnUrl,
          cdnUrl,
          status,
          tags: tags ? tags.split(',') : [],
          author,
          editors: editor ? editor.split(',') : [],
          lastEditTime: updateTime || createTime,
        };
      });
    }
    return result;
  }

  /**
   * 获取key-value详情
   *
   * @param _id
   * @param mode
   */
  public async getDetail(_id: string, mode: string): Promise<Response> {
    let { ctx } = this;

    if (mode === Emode.DRAFT) { // 草稿预览
      const res = await ctx.service.db.findOne(ctx.model.KeyValueDraft, {
        _id,
      });

      if (res.data) {
        return JSON.parse(res.data.config);
      }
    } else {
      const res = await ctx.service.db.findOne(ctx.model.KeyValue, { _id });

      if (res.data) {
        const { config, grayConfig, publishConfig } = res.data;

        if (mode === Emode.PREVIEW && config) {
          return config;
        } 
        if (mode === Emode.GRAY && grayConfig) {
          return grayConfig;
        }
         if (mode === Emode.PUBLISH && publishConfig) {
          return publishConfig;
        }
      }
    }

    return {
      status: false,
      msg: '未找到配置',
    };
  }

  /**
   * 获取key-value标签，未实现
   *
   */
  public async tags(): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, {
      title: 'KEY_VALUE_TAGS',
    });

    if (res.data) {
      let resultData: any = res.data;
      const config = JSON.parse(resultData.config);
      return {
        status: true,
        data: config.tags,
      };
    }

    return {
      status: false,
      msg: '未找到配置',
    };
  }

  /**
   * 更新key-value标签，未实现
   *
   */
  public async updateTags(id: string, tags: Array<string>): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, { _id: id });

    if (!res.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      return await ctx.service.db.update(
        ctx.model.KeyValue,
        { _id: id },
        {
          tags: tags.join(','),
        }
      );
    }
  }

  /**
   * 更新key-value编辑人员，未实现
   *
   */
  public async updateEditors(
    id: string,
    editors: Array<string>
  ): Promise<Response> {
    let { ctx } = this;

    const res = await ctx.service.db.findOne(ctx.model.KeyValue, { _id: id });

    if (!res.data) {
      return {
        status: false,
        msg: '该记录不存在',
      };
    } else {
      return await ctx.service.db.update(
        ctx.model.KeyValue,
        { _id: id },
        {
          editor: editors.join(','),
        }
      );
    }
  }
}
