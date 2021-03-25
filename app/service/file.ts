import * as path from 'path';
const fsExtra = require("fs-extra");

import { Service } from 'egg';

/**
 * 文件操作 Service
 */
export default class Index extends Service {
  /**
   * 
   * @param fileName 文件名
   * @param filepath 源文件路径
   */
  public async saveFile({
    filename,
    filepath
  }) {
    const currentTime =  String(new Date().getTime());
    const fileName = path.basename(filename);
    const imgDir = this.ctx.app.config.imgDir; // 目标文件夹
    const destPath = path.join(imgDir, currentTime, fileName);
    try {
      await fsExtra.copy(filepath, destPath);
      this.ctx.cleanupRequestFiles();
      // await this.upload2Cdn();
      return {
        status: true,
        destPath: `public/img/${currentTime}/${fileName}`,
      }
    } catch (err) {
      console.error(err);
      return {
        status: false,
        msg: '上传服务异常',
      }
    }
  }

  public async newDirp(dest = '') {
    const destPath = path.join(`${process.cwd()}`, 'app/public', dest);
    try {
      await fsExtra.mkdirp(destPath);
      return destPath;
    } catch (err) {
      console.error(err);
    }
    return "";
  }

  /**
   * key-value配置json静态化
   * 
   * @param configList
   */
  public async uploadConifg({fileName, config}: {
    fileName: string,
    config: string
  }) {
    const { ctx } = this;
    const tempPath = path.resolve(ctx.app.config.fileDir);
    fsExtra.ensureDirSync(tempPath);
    const filePath = path.resolve(tempPath, `./${fileName}`);
    fsExtra.writeJsonSync(filePath, config);
    // await this.upload2Cdn();
    return 'public/json/' + fileName;
  }

  // todo 根据业务需要上传资源到cdn，譬如7牛云、阿里云
  public async upload2Cdn(src) {
    console.log(src);
    return;
  }
}
