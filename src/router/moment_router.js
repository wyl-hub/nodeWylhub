const Router = require('koa-router')
const {
  create,
  getDetail,
  getMomentList,
  updateMoment,
  deleteMoment,
  getMomentAndComment,
  addTags
} = require('../controller/moment_controller')

const {
  ifExist
} = require('../middleware/tag_middleware')

const {
  verifyToken
} = require('../middleware/auth_middelware')

const { verifyPermission } = require('../middleware/permission_middleware')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyToken, create)

// 获取某一条动态详情
momentRouter.get('/getDetail', getDetail)

// 获取动态详情时顺带获取该动态下面的所有评论 
// 或者 该动态下所有评论为一个新接口

momentRouter.get('/getMomentAndComment', getMomentAndComment)

// 获取动态列表
momentRouter.get('/getMomentList', getMomentList)

// 修改动态
momentRouter.post('/updateMoment', verifyToken, verifyPermission('moment'), updateMoment)

// 删除动态
momentRouter.get('/deleteMoment', verifyToken, verifyPermission('moment'), deleteMoment)

// 给动态添加标签
momentRouter.post('/addTags', verifyToken, verifyPermission('moment'), ifExist, addTags)

module.exports = momentRouter