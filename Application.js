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

        this.config = loadConfig(this);

        loadExtensions(this);

        loadRootRouter(this);

        this.use(this.router.routes()).use(this.router.allowedMethods());

        this.on('error', (err, ctx) => {
            console.log(err);
        })

        this.listen(3000, () => {
            console.log('running at http://127.0.0.1:3000');
        });
    }
}

function loadConfig(app) {
    return loadConfigByDir(process.cwd(), app);
}

function loadConfigByDir(dir, app) {
    let config={};

    let defaultConfig = path.join(dir, 'config', 'config.default.js');
    if(fs.existsSync(defaultConfig)){
        config = require(defaultConfig);
    }else{
        //如果不是根目录，可以不用提示错误
        //console.warn(`${defaultConfig} not exist.`); 
    }

    const env = process.env.NODE_ENV;
    let envConfig = path.join(dir, 'config', `config.${env}.js`);
    if(fs.existsSync(envConfig)){
        let econfig = require(envConfig)(app);
        config=Object.assign(config, econfig);
    }else{
        //console.warn(`the NODE_ENV is ${env}, but ${envConfig} not exist.`);
    }

    return config;
}


function loadRootRouter(app) {
    const routerDir = path.join(process.cwd(), 'router.js');
    if (fs.existsSync(routerDir)) {
        const router = require(routerDir);
        if (typeof router === 'function') {
            router(app);
        }
    }
}

function loadExtensions(app) {
    const extensions = [];
    const extensionsDir = path.join(process.cwd(), 'extensions');
    if (fs.existsSync(extensionsDir)) {
        //获取插件的绝对路径
        extensions.concat(fs.readdirSync(extensionsDir).map(x => extensions.push(path.join(extensionsDir, x))));
    }

    //TODO 还可以考虑实现嵌套
    extensions.forEach(extension => {
        const routerDir = path.join(extension, 'router.js');
        const config = loadConfigByDir(extension, app);
        if (fs.existsSync(routerDir)) {
            const router = require(routerDir);
            if (typeof router === 'function') {
                const extensionModule ={
                    // 此处 {} 是为了避免 app.config 被修改
                    config: Object.assign({}, app.config, config)
                }
                // config 可以做到 controller 里面去，在每次 ctx 中生效。
                router(app);
            }
        }
    })
}


module.exports = Application;
