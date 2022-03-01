const { ERROR_USER, ERROR_LOGIN } = require('../utils/contans')
const userService = require('../service/user_service')
const crypto = require('crypto')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断 name psw 是否为空 
  if (!name || !password || !name.trim() || !password.trim()) {
    const error = new Error(ERROR_USER)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断账户是否存在 判断密码是否正确
  const md5 = crypto.createHash('md5')
  const newPassword = md5.update(password).digest('hex')
  const result = await userService.getUserByName(name)
  // 用户不存在
  if (result.length === 0) {
    const error = new Error(ERROR_LOGIN)
    return ctx.app.emit('error', error, ctx)
  }
  const { password: mysqlPsw } = result[0]
  // 密码错误
  if (newPassword !== mysqlPsw) {
    const error = new Error(ERROR_LOGIN)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


module.exports = {
  verifyLogin
}