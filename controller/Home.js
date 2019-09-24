const serviceHome = require("../service/Home")
const MiSend = require("../middleware/mi-send/index")

/*controller 里面只做一些简单的参数处理*/

module.exports = {
    // 修改 index 方法
    index: async function (ctx, next) {
        await ctx.render("Home/index", {title: "iKcamp欢迎您"})
    },
    // 修改 register 方法
    register: async function (ctx, next){
        let params = ctx.request.body;
        let name = params.name;
        let password = params.password;
        let res = await serviceHome.register(name,password)
        if(res.status == "-1"){
            await ctx.render("Home/Login", res.data)
        }else{
            ctx.state.title = "个人中心"
            await ctx.render("Home/Success", res.data)
        }
    },
    home: async (ctx, next) => {
        //服务器按照传输格式要求对前台传递数据
        ctx.send({
            status: 'success',
            data: 'hello ikcmap'
        })
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async (ctx, next) => {
        //使用模版，跳转到模版
        await ctx.render("Home/Login",{
            btnName:"hello"
        })
    },
}
