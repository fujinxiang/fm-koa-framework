const path = require('path');

module.exports = (app) => {
  const { router } = app;

  router.get('/info', async ( ctx )=>{
    let html = `
      <h1>this is extension info ${app.config.serverUrl}</h1>
    `
    ctx.body = html
  })
}