const errorType = require('../utils/contans')

const errorHandle = async (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorType.ERROR_USER:
      status = 400 // 请求参数错误
      message = error.message
      break
    case errorType.ERROR_CONFLICT:
      status = 409 // 数据冲突
      message = error.message
      break
    case errorType.ERROR_LOGIN:
      status = 500
      message = error.message
      break
    case errorType.ERROR_TOKEN:
      status = 401
      message = error.message
      break
    default:
      status = 404
      message = 'not found ~~~~~'
  }
  ctx.status = status
  ctx.body = message
}


module.exports = errorHandle