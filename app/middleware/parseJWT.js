// app/middleware/parseJWT
const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function parseJWT(ctx, next) {
    // console.log(ctx.headers);
    const token = ctx.headers.authorization;
    // console.log(t);
    if (token) {
      const t = token.split(' ');
      jwt.verify(t[1], ctx.app.config.jwtKey, (err, decode) => {
        if (err) {
          ctx.body = {
            status: 0,
            message: '身份认证出错,请重新登录',
          };
        } else {
          // ctx.header.auth = decode;
          // ctx.set('auth', decode);
          ctx.request.body.authorization = decode;
          // console.log(decode);
        }
      });
      next();
    } else {
      ctx.body = {
        status: 0,
        message: '身份认证出错,请重新登录',
      };
    }
    // console.log('hello1');
  };
};

