const path = require('path');

module.exports = app => {
  const { router } = app;

  router.get('/fm', async ( ctx )=>{
    const relativePath = path.relative(process.cwd()+'/views', __dirname+'/views');
  
    await ctx.render(path.join(relativePath, 'hello'));
  })
}