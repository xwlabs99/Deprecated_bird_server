/*
对filter进行处理，拓展sequlize的查询
 */
module.exports = () => {
  return async function modifyFilter(ctx, next) {
    const Sequelize = ctx.app.Sequelize;
    const { fn, col, litertal, where } = Sequelize;
    console.log('modifyFilter');
    let hasPropFlag = false;
    let newFilter = ctx.request.body.data.filter || {};
    console.log(newFilter.created_time);
    Object.keys(newFilter).forEach(key => {
      switch (key) {
        case 'created_time':
        case 'followed_time':
        {
          hasPropFlag = true;
          const date = newFilter[key];
          delete newFilter[key];
          const dateFilter = where(fn('DATE', col(key)), '=', date);
          newFilter = {
            ...newFilter,
            dateFilter,
          };
          break;
        }
        default:
          break;
      }
    });
    if (hasPropFlag) {
      ctx.request.body.data.filter = newFilter;
    }

    console.log(newFilter);
    await next();
  };
};
