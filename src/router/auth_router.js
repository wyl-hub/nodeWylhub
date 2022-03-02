const Router = require('koa-router')
const { verifyLogin, verifyToken } = require('../middleware/auth_middelware')
const { login } = require('../controller/auth_controller')


const authRouter = new Router({ prefix: '/login' })

authRouter.get('/', verifyLogin, login)
authRouter.get('/test', verifyToken, async ctx => {
  ctx.body = '授权成功'
})

module.exports = authRouter