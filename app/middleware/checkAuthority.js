// app/middleware/parseJWT

module.exports = () => {
  return async function checkAuthority(ctx, next) {
    // console.log('tes');
    // console.log(ctx.request.body);
    next();
    // console.log(ctx.request.headers);
    // const method = ctx.request.method;
    // const url = ctx.request.url;
    // const userId = ctx.request.body.authorization.id;
    // const userType = ctx.request.body.authorization.user_type;

    // console.log(method);
    // console.log(url);
    // console.log(ctx.re;';ldddssdfdvvvvquest.body.authorization);
  };
};

