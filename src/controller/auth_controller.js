const jwt = require('jsonwebtoken')

// 对称密钥
const PRIVATE_KEY = 'wyl111'

class AuthController {
  async login(ctx, next) {
    const user = ctx.request.body
    // 颁发token
    const token = jwt.sign({...user}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24
    })
    ctx.body = {
      ...user,
      token
    }
  }
}

module.exports = new AuthController()