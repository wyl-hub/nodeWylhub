const Router = require('koa-router')
const authRouter = new Router({ prefix: '/login' })
const { verifyLogin } = require('../middleware/auth_middelware')


authRouter.get('/', verifyLogin, ctx => {
  console.log(ctx.request.body)
  ctx.body = '登录测试'
})


module.exports = authRouter