const router = require('koa-router')()
const Home = require("../controller/Home");

/*路由只有两个功能，第一个启动路由，第二个管理路由*/
module.exports = (app) => {
    //管理路由
    router.get('/', Home.index)

    router.get('/home', Home.home)

    router.get('/home/:id/:name', Home.homeParams)

    router.get('/user', Home.login)

    // 增加响应表单请求的路由
    router.post('/user/register', Home.register)

    //启动路由
    app.use(router.routes())
        .use(router.allowedMethods())
}
