const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const fs = require('fs');
const path = require('path');

class Application extends Koa {
    init() {
        this.router = new Router();

        this.use(views(process.cwd() + '/views', {
            map: {
                html: 'ejs'
            }
        }));

        this.use(async function (ctx, next) {
            ctx.state = {
                title: 'this is a koa app'
            };

            await next();
        });
    }

    run() {
        this.init();

        const localRouter = require(path.join(process.cwd(), 'router'));

        const routers = loadExtensions().concat(localRouter);
        routers.forEach(router => {
            router(this);
        })

        this.use(this.router.routes()).use(this.router.allowedMethods());

        this.on('error', (err, ctx) => {
            console.log(err);
        })

        this.listen(3000, () => {
            console.log('running at http://127.0.0.1:3000');
        });
    }
}


function loadExtensions() {
    const extensionsDir = path.join(process.cwd(), 'extensions');
    const extensions = fs.readdirSync(extensionsDir);
    const routers = [];
    extensions.forEach(extension => {
        const routerDir = path.join(extensionsDir, extension, 'router.js');
        if (fs.existsSync(routerDir)) {
            const router = require(routerDir);
            if (typeof router === 'function') {
                routers.push(router);
            }
        }
    })
    return routers;
}


module.exports = Application;
