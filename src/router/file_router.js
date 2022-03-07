const Router = require('koa-router')
const { 
    verifyToken
} = require('../middleware/auth_middelware')

const {
    avatarHandle,
    momentFileHandle
} = require('../middleware/upload_middleware')

const {
    create,
    getFile,
    uploadMomentFile
} = require('../controller/upload_controller')
const fileRouter = new Router({ prefix: '/upload' })

// 上传或者修改用户头像
fileRouter.post('/avatar', verifyToken, avatarHandle, create)

// 上传动态图片
fileRouter.post('/momentFile', momentFileHandle, uploadMomentFile)

// 返回文件资源
fileRouter.get('/getFile', getFile)

module.exports = fileRouter