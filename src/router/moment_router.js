const Router = require('koa-router')
const {
  create,
  getDetail,
  getMomentList,
  updateMoment,
  deleteMoment
} = require('../controller/moment_controller')

const {
  verifyToken
} = require('../middleware/auth_middelware')

const { verifyPermission } = require('../middleware/permission_middleware')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyToken, create)

// 获取某一条动态详情
momentRouter.get('/getDetail', getDetail)

// 获取动态列表
momentRouter.get('/getMomentList', getMomentList)

// 修改动态
momentRouter.post('/updateMoment', verifyToken, verifyPermission('moment'), updateMoment)

// 删除动态
momentRouter.get('/deleteMoment', verifyToken, verifyPermission('moment'), deleteMoment)

module.exports = momentRouter