/*
 * 参考 egg-core/lib/utils/base_context_class.js
 */
const path = require('path');

class Controller {

    constructor(ctx) {
        const wrappedRender = ctx.render;
        //此处必须要用 async 和 await
        ctx.render = async function(relPath, locals = {}) {
            const rp = path.join('..\\extensions\\origin\\views', relPath);
            await wrappedRender(rp, locals)
        }

        this.ctx = ctx;

        this.app = ctx.app;

        this.config = ctx.app.config;

        //   this.service = ctx.service;
    }
}

module.exports = Controller;