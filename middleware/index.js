//管理中间件
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const path = require('path');
const MiSend = require("./mi-send/index")
// 引入 koa-static
const staticFiles = require('koa-static')
const MiLog = require("./mi-log")
const ip = require('ip');
// 引入请求错误中间件
const miHttpError = require('./mi-http-error')
module.exports = (app) => {
    // 注册中间件

    // 应用请求错误中间件
// app.use(miHttpError())
    app.use(miHttpError({
        errorPageFolder: path.resolve(__dirname, '../errorPage')
    }))
    app.use(MiLog({
        env: app.env,  // koa 提供的环境变量
        projectName: 'koa2-tutorial',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }));

    //设置使用静态资源（css）的目录
    app.use(staticFiles(path.resolve(__dirname, "../public")));
    //设置模版的目录
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));
    //设置post请求解析
    app.use(bodyParser());
    app.use(MiSend());

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })

};
