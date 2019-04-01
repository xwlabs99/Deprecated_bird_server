// app/middleware/parseJWT
const Rule = new Map();
Rule.set({
  method: 'GET',
  url: '',
}, []);
module.exports = () => {
  return async function checkAuthority(ctx, next) {
    await next();
    // console.log(ctx.request.body);
    // console.log(ctx.request.headers);
    const method = ctx.request.method;
    const url = ctx.request.url;
    const userId = ctx.request.body.authorization.id;
    const userType = ctx.request.body.authorization.user_type;
    
    ctx.body = {
      message: 'error',
    };
    console.log(method);
    console.log(url);
    console.log(ctx.request.body.authorization);
  };
};

