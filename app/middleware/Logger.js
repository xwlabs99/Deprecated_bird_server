// app/middleware/parseJWT
module.exports = () => {
  return async function parseParam(ctx, next) {
    await next();
    const method = ctx.request.method;
    // const url = ctx.request.url;
    // const userId = ctx.request.body.authorization.id;
    // const userType = ctx.request.body.authorization.user_type;
    console.log('请求');
    console.log(method);
    // console.log(u)

  };
};

