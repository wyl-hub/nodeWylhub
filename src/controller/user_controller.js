const {
  create
} = require('../service/user_service')
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body
    // 返回数据
    await create(user)
    ctx.body = '创建用户成功！'
  }
}


module.exports = new UserController() 