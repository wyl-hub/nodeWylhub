const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user_router')
const errorHandle = require('./errorHandler')
const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.on('error', errorHandle)
module.exports = app