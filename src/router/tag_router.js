const Router = require('koa-router')

const { verifyToken } = require('../middleware/auth_middelware')
const { 
    create,
    getTagList
} = require('../controller/tag_controller')
const tagRouter = new Router({ prefix: '/tag' })

tagRouter.post('/', verifyToken, create)

tagRouter.get('/getTagList', getTagList)

module.exports = tagRouter