const path = require('path');

module.exports = app => {
  const { router } = app;

  router.get('/', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');
    await ctx.render(path.join(relativePath, 'index'));
  });

  router.get('/router', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    const routers = ctx.app.router.stack.map(x=>x.path);
    routers.splice(routers.indexOf('/'),1);

    await ctx.render(path.join(relativePath, 'router'), { routers: routers });
  });

  router.get('/appName', async (ctx) => {
    ctx.body = ctx.app.config.appName;
  })
  
  router.get('/helloworld', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    await ctx.render(path.join(relativePath, 'hello'));
  });

  router.get('/app1', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    await ctx.render(path.join(relativePath, 'app1'));
  });

  router.get('/app2', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    await ctx.render(path.join(relativePath, 'app2'));
  });
}