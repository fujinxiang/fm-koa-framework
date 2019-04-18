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

        const routers = loadExtensions();
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
    const extensions = [];
    const extensionsDir = path.join(process.cwd(), 'extensions');
    if (fs.existsSync(extensionsDir)) {
        //获取插件的绝对路径
        extensions.concat(fs.readdirSync(extensionsDir).map(x => extensions.push(path.join(extensionsDir, x))));
    }

    //将根目录当作一个特殊的插件
    extensions.push(process.cwd());

    const routers = [];
    //TODO 还可以考虑实现嵌套
    extensions.forEach(extension => {
        console.log(extension);
        const routerDir = path.join(extension, 'router.js');
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
