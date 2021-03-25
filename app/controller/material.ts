import { Controller } from 'egg';

/**
 * 文件上传
 */
export default class MaterialController extends Controller {

  public async upload() {
    const { ctx } = this;
    let domain = ctx.app.config.domain;
    
    const file = ctx.request.files[0];
    let { envId } = ctx.request.body;
    if (envId) {
      const envData = await ctx.service.db.findOne(ctx.model.Env, { _id: envId });
      if (envData) {
        domain = envData.data.cdnDomain;
      }
    }
    
    const result = await this.service.file.saveFile(file);

    if (!result.status) {
      ctx.body = result;
      return;
    }

    ctx.body = {
      status: true,
      data: {
        link: domain + result.destPath
      }
    }
    return;
  }
}
