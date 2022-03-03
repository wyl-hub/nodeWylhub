const connection = require('../app/database')
class AuthService {
    async checkMoment(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
        const result = await connection.execute(statement, [id, userId])
        const flag = result[0].length === 0 ? false : true
        return flag
    }
}

module.exports = new AuthService()