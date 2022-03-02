const jwt = require('jsonwebtoken')
const { ERROR_USER, ERROR_LOGIN, ERROR_TOKEN } = require('../utils/contans')
const throwError = require('../utils/throwError')
const userService = require('../service/user_service')
const crypto = require('crypto')

const PRIVATE_KEY = 'wyl111'

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断 name psw 是否为空 
  if (!name || !password || !name.trim() || !password.trim()) {
    return throwError(ERROR_USER, ctx)
  }

  // 判断账户是否存在 判断密码是否正确
  const md5 = crypto.createHash('md5')
  const newPassword = md5.update(password).digest('hex')
  const result = await userService.getUserByName(name)
  // 用户不存在
  if (result.length === 0) {
    return throwError(ERROR_LOGIN, ctx)
  }
  const { password: mysqlPsw } = result[0]
  // 密码错误
  if (newPassword !== mysqlPsw) {
    return throwError(ERROR_LOGIN, ctx)
  }
  await next()
}

const verifyToken = async (ctx, next) => {
  let { authorization } = ctx.request.header
  if (!authorization) return throwError(ERROR_TOKEN, ctx)
  authorization = authorization.replace('Bearer ', '')
  // jwt 校验令牌错误不会报错  在内部抛出异常
  try {
    // 校验通过 保存 user 信息
    const result = jwt.verify(authorization, PRIVATE_KEY)
    ctx.user = result
  } catch {
    return throwError(ERROR_TOKEN, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyToken
}