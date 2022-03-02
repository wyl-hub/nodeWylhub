const Router = require('koa-router')
const {
  create
} = require('../controller/moment_controller')
const {
  verifyToken
} = require('../middleware/auth_middelware')


const momentRouter = new Router({ prefix: '/moment' })


momentRouter.post('/', verifyToken, create)

module.exports = momentRouter