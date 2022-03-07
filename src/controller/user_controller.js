const fs = require('fs')
const userService = require('../service/user_service')
const fileService = require('../service/file_service')
const { AVATAR_PATH } = require('../utils/filePath')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body
    // 返回数据
    await userService.create(user)
    ctx.body = '创建用户成功！'
  }

  async getAvatar(ctx, next) {
    const { id } = ctx.request.query
    const [result] = await fileService.getUserAvatar(id)
    const avatarUrl = `uploads/avatar/${result[0].file_name}`
    ctx.response.set('content-type', result[0].mimetype)
    ctx.body = fs.createReadStream(avatarUrl)
  }
}


module.exports = new UserController() 