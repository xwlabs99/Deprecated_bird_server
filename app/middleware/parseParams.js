const path = require('path');
module.exports = () => {
  return async function parseParams(ctx, next) {

    // console.log(ctx.request);
    console.log('parseParams');
    switch (ctx.request.method) {
      case 'GET':
      {
        ctx.request.body = {
          ...ctx.request.body,
          data: {},
        };
        const attributesArray = ctx.queries.attributes || [];
        ctx.request.body.data.attributes = attributesArray;
        ctx.request.body.model = path.parse(ctx.request.url.split('?')[0]).base;
        delete ctx.queries.attributes;// 去掉attributes属性
        const filter = ctx.queries;
        Object.keys(ctx.queries).forEach(key => {
          if (filter[key].length === 1) {
            filter[key] = filter[key][0];
          }
        });
        ctx.request.body.data.filter = filter;
        console.log(filter);
        ctx.request.body.data.filter.id && (ctx.request.body.data.filter.id = Number(ctx.request.body.data.filter.id));
        break;
      }
      case 'POST':
      {
        ctx.request.body.model = path.parse(ctx.request.url.split('?')[0]).base;
        break;
      }
      case 'PUT':
      {
        ctx.request.body.model = path.parse(ctx.request.url.split('?')[0]).base;
        break;
      }
      case 'DELETE':
      {
        ctx.request.body.model = path.parse(ctx.request.url.split('?')[0]).base;
        ctx.request.body.data = {};
        break;
      }
      default:
        break;
    }
    await next();
  };
};
