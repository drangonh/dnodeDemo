const logger = require("./logger")
module.exports = (options) => {
    const loggerMiddleware = logger(options)

    return (ctx, next) => {
        return loggerMiddleware(ctx, next)
            .catch((e) => {
                if (ctx.status < 500) {
                    ctx.status = 500;
                }
                //打印堆栈错误日志
                ctx.log.error(e.stack);
                ctx.state.logged = true;
                //异常抛出
                ctx.throw(e);
            })
    }
}