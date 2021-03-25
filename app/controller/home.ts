import Controller from '@/controller/baseController';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'hello，pear-config！';
    return;
  }
}
