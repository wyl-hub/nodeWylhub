const { ERROR_USER, ERROR_CONFLICT } = require('../utils/contans')
const throwError = require('../utils/throwError')
const userService = require('../service/user_service')

const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body
  // 用户名和密码都不能为空
  if (!name || !password || !name.trim() || !password.trim()) {
    return throwError(ERROR_USER, ctx)
  }
  // 用户名不能被注册过
  const result = await userService.getUserByName(name)
  if (result.length > 0) {
    return throwError(ERROR_CONFLICT, ctx)
  }
  await next()
}


module.exports = {
  verifyUser
}