const connection = require('../app/database')
// node 自带
const crypto = require('crypto')
class UserService {
  async create(user) {
    const { name, password } = user
    // 密码加密
    const md5 = crypto.createHash('md5')
    const newPassword = md5.update(password).digest('hex')
    const statement = `INSERT INTO users (name, password) values (?, ?);`
    const result = await connection.execute(statement, [name, newPassword])
    return result
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()