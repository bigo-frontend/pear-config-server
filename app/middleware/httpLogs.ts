module.exports = () => {
  return async (ctx, next) => {

    await next();

    ctx.app.logger.info('res=%j', {
      user: ctx.userInfo?.username,
      url: ctx.request.url,
      method: ctx.request.method,
      body: ctx.request.body,
      referer: ctx.request.headers.referer,
      resStatus: ctx.response.status,
    });
    
    return ctx.body;
  };
};