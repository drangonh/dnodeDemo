//设置数据传输类型,
module.exports = () => {
    function render(json) {
        //设置服务器返回的数据类型
        this.set("Content-Type", "application/json");
        //设置数据载体为json字符串
        this.body = JSON.stringify(json)
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx);
        //这里是发送响应的地方，可以把响应的请求日志放在这里去处理
        // ctx.log.error("something wrong")
        await next()
    }
}
