module.exports = () => {
  return async (ctx, next) => {
    ctx.userInfo = {
      username: 'admin', // todo 业务自行实现登录流程，默认登录用户
    };
    try {
      await next();
    } catch(err) {
      ctx.logger.error(err);
      ctx.body = {
        status: false,
        msg: '出错啦~'
      }
    }

    return ctx.body;
  };
};