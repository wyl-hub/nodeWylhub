const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })
const {
  vertify
} = require('../middleware/user_middleware')
const {
  create
} = require('../controller/user_controller')

userRouter.post('/', vertify, create)


module.exports = userRouter