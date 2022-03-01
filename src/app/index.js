const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./errorHandler')

const userRouter = require('../router/user_router')
const authRouter = require('../router/auth_router')
const app = new Koa()

app.use(bodyParser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())


app.on('error', errorHandle)
module.exports = app