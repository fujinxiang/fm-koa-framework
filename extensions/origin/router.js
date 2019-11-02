const path = require('path');

module.exports = app => {
  const { router } = app;

  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
      <li><a href="/info">/info</a></li>
      <li><a href="/fm">/fm</a></li>
    </ul>
  `

  router.get('/', async (ctx) => {
    ctx.body = html
  });

  router.get('/c', app.controller.index);

  router.get('/page/404', async (ctx) => {
    ctx.body = '404 page!'
  }).get('/page/helloworld', async (ctx) => {
    const relativePath = path.relative(process.cwd() + '/views', __dirname + '/views');

    await ctx.render(path.join(relativePath, 'hello'));
  });
}