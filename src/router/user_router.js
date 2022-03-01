const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })
const {
  verifyUser
} = require('../middleware/user_middleware')
const {
  create
} = require('../controller/user_controller')

userRouter.post('/', verifyUser, create)


module.exports = userRouter