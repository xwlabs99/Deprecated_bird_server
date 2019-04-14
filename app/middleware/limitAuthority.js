// app/middleware/parseJWT

module.exports = () => {
  return async function limitAuthority(ctx, next) {
    const Op = ctx.app.Sequelize.Op;
    const LIMIT = {
      bar: {
        GET: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              id: userInfo.bar_id,
            };
            newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              id: userInfo.bar_id,
            };
            newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          游客: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            // newBody.data.attributes = [ 'id', 'bar_name' ];
            newBody.data.filter = {
              ...newBody.data.filter,
              // type: '普通酒吧',
            };
            return newBody;
          },
        },
        POST: {
          门店客服: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            return ctx.request.body;
          },
        },
        PUT: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              id: userInfo.bar_id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
        },
      },
      user: {
        GET: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            const limit = [ 'id', 'bar_id', 'phone', 'user_type', 'username' ];
            const newAttributes = newBody.data.attributes;
            ctx.request.body.data.attributes.forEach((element, index) => {
              if (limit.indexOf(element) <= -1) {
                newAttributes.slice(index, 1);
              }
            });
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
              user_type: [ '门店客服', '销售员' ],
            };
            newBody.data.attributes = newAttributes;
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            const limit = [ 'id', 'bar_id', 'phone', 'user_type', 'username' ];
            const newAttributes = newBody.data.attributes;
            ctx.request.body.data.attributes.forEach((element, index) => {
              if (limit.indexOf(element) <= -1) {
                newAttributes.slice(index, 1);
              }
            });
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
              user_type: [ '门店客服', '销售员' ],
            };
            newBody.data.attributes = newAttributes;
            return newBody;
          },
          游客: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
            };
            return newBody;
            // ctx.throw('403', '你无权进行此操作');
          },
        },
        POST: {
          门店客服: (userInfo, ctx) => {
            ctx.throw(403, '你无权进行此操作');
          },
          销售员: (userInfo, ctx) => {
            ctx.throw(403, '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            return ctx.request.body;
          },
        },
        PUT: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              id: userInfo.id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              id: userInfo.id,
            };
            return newBody;
          },
          游客: (userInfo, ctx) => {
            return ctx.request.body;
          },
        },
      },
      package: {
        GET: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.attributes = [ 'id', 'bar_id', 'package_name', 'package_price', 'tips', 'type' ];
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
              status: '使用中',
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.attributes = [ 'id', 'bar_id', 'package_name', 'package_price', 'tips', 'type' ];
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
              status: '使用中',
            };
            return newBody;
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            return ctx.request.body;
          },
        },
        POST: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data = {
              ...newBody.data,
              bar_id: userInfo.bar_id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            return ctx.request.body;
          },
        },
        PUT: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            return ctx.request.body;
          },
        },
        DELETE: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            return ctx.request.body;
          },
        },
      },
      order: {
        GET: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
            };
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            if (Object.keys(newBody.data.filter).length === 0) {
              newBody.data.filter[Op.or] = [
                {
                  bar_id: userInfo.bar_id,
                  saleperson_id: userInfo.id,
                },
                {
                  bar_id: userInfo.bar_id,
                  order_status: [ '待接受' ],
                },
              ];
            } else {
              newBody.data.filter = {
                ...newBody.data.filter,
                bar_id: userInfo.bar_id,
              };
            }
            // [Op.or] = [{ id: 4 }, { id: 5 }];
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          游客: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            // newBody.data.attributes = [ 'id', 'bar_name' ];
            newBody.data.filter = {
              ...newBody.data.filter,
            };
            return newBody;
          },
        },
        POST: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data = {
              ...newBody.data,
              bar_id: userInfo.bar_id,
              creater_id: userInfo.id,
            };
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data = {
              ...newBody.data,
              bar_id: userInfo.bar_id,
              order_type: '自来客',
              creater_id: userInfo.id,
            };
            newBody.data.attributes = {
              ...newBody.data.attributes,
            };
            return newBody;
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            const newBody = ctx.request.body;
            return newBody;
          },
        },
        PUT: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
            };
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              bar_id: userInfo.bar_id,
            };
            console.log('销售员');
            newBody.data.attributes.order_status === '待跟进' ?
              (newBody.data.attributes.saleperson_id = userInfo.id) :
              (newBody.data.filter.saleperson_id = userInfo.id);
            return newBody;
          },
          游客: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
        },
      },
      announcement: {
        GET: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              visible_user_type: [ '所有人', '门店客服' ],
              bar_id: userInfo.bar_id,
            };
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data.filter = {
              ...newBody.data.filter,
              visible_user_type: [ '销售员', '所有人' ],
              bar_id: userInfo.bar_id,
            };
            // [Op.or] = [{ id: 4 }, { id: 5 }];
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          游客: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            // newBody.data.attributes = [ 'id', 'bar_name' ];
            newBody.data.filter = {
              ...newBody.data.filter,
            };
            return newBody;
          },
        },
        POST: {
          门店客服: (userInfo, ctx) => {
            const newBody = ctx.request.body;
            newBody.data = {
              ...newBody.data,
              bar_id: userInfo.bar_id,
              creater_id: userInfo.id,
              visible_user_type: '所有人',
            };
            // newBody.data.attributes = [ ...newBody.data.attributes ];
            return newBody;
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            // ctx.throw('403', '你无权进行此操作');
            const newBody = ctx.request.body;
            return newBody;
          },
        },
        PUT: {
          门店客服: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          销售员: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
          游客: (userInfo, ctx) => {
            ctx.throw('403', '你无权进行此操作');
          },
        },
      },
    };

    const userInfo = ctx.request.body.authorization;
    const model = ctx.request.body.model;
    const Method = ctx.request.method;
    const userType = userInfo !== null ? userInfo.user_type : '游客';
    console.log('limitAuth');
    // console.log(ctx.request.body);
    // console.log(userInfo);
    // console.log(model);
    // console.log(Method);
    // console.log(userType);
    if (LIMIT[model] && LIMIT[model][Method] && LIMIT[model][Method][userType]) {
      const newBody = LIMIT[model][Method][userType](userInfo, ctx);
      ctx.request.body = newBody;
      console.log(ctx.request.body);
    }
    await next();
  };
};

