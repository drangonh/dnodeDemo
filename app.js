//node.js需要学的：restful API，
//框架express，了解一下koa1和koa2的区别
//数据库：MongoDB,MySQL,Redis
//TCP/IP,HTTP,SOcket,WebSocket协议，25
//运维基本知识：30
//加分项：app，小程序
//基本算法

//目标：30
//阶段目标：
//使用http+MySQL+微信小程序实现一个小产品；

//第二步使用mongoDB和redis扩展功能

const Koa = require('koa');
const app = new Koa();
const router = require('./router/index');
const Middleware = require("./middleware");
const sqlConnect = require("./controller/mysqlConfig")

//每个请求都会走一次中间件和一次路由，中间件和路由里都会接受到上线问ctx和next参数
Middleware(app);
router(app);

app.listen(3000, async () => {
    sqlConnect.findUserData("hl");
    console.log('server is running at http://localhost:3000')
})


//启动node服务：node app.js

//PATH="$PATH":/usr/local/mysql/bin
//启动mysql服务：mysql -u root -p
