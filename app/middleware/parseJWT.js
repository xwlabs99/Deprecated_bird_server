// app/middleware/parseJWT
module.exports = () => {
  return async function parseJWT(ctx, next) {
    // console.log(ctx.headers);
    const token = ctx.headers.authorization;
    console.log('parseJWT');
    // console.log(token);
    // console.log(t);
    if (token) {
      ctx.request.body.authorization = await ctx.helper.JWTverify(token, ctx.app.config.jwtKey);
    } else {
      ctx.request.body.authorization = null;
    }
    await next();
    // console.log('hello1');
  };
};

