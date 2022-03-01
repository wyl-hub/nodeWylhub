const { ERROR_USER, ERROR_CONFLICT } = require('../utils/contans')
const userService = require('../service/user_service')

const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body
  // 用户名和密码都不能为空
  if (!name || !password || !name.trim() || !password.trim()) {
    const error = new Error(ERROR_USER)
    return ctx.app.emit('error', error, ctx)
  }
  // 用户名不能被注册过
  const result = await userService.getUserByName(name)
  if (result.length > 0) {
    const error = new Error(ERROR_CONFLICT)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


module.exports = {
  verifyUser
}