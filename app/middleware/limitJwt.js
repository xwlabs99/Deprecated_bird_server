const path = require('path');
const Ignore = {
  bar: {
    GET: true,
  },
  image: {
    POST: true,
  },
};
module.exports = () => {
  return async function limitJwt(ctx, next) {
    console.log('limitJWT');
    const authorization = ctx.request.body.authorization;
    const model = path.parse(ctx.request.url.split('?')[0]).base;
    const method = ctx.request.method;
    // console.log(model);
    // console.log(authorization)
    const Handle = Ignore[model] ? Ignore[model][method] !== true : true;
    if (authorization === null && Handle) {
      // ctx.throw('身份认证出错,请重新登录', 403);
    }
    await next();
  };
};
