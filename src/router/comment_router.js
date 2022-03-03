const Router = require('koa-router')
const {
  create,
  reply,
  deleteComment
} = require('../controller/comment_controller')
const { verifyToken } = require('../middleware/auth_middelware')
const { verifyPermission } = require('../middleware/permission_middleware')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论(评论动态) 
commentRouter.post('/', verifyToken, create)

// 回复评论
commentRouter.post('/reply', verifyToken, reply)

// 删除评论
commentRouter.get('/deleteComment', verifyToken, verifyPermission('comment'), deleteComment)

module.exports = commentRouter