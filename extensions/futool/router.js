module.exports = (app) => {
  const { router } = app;

  router.get('/futool/update-info', async (ctx) => {
    ctx.body = {
      version: '1.0.0',
      downloadUrl: 'https://www.fujinxiang.cn',
    };
  });

  router.get('/futool/plugins', async (ctx) => {
    ctx.body = [];
  });

  router.get('/futool/report', async (ctx) => {
    ctx.body = {
      code: 200,
      message: 'report ok',
    };
  });
};
