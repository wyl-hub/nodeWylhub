const connection = require('../app/database')

class CommentService {
    async create(momentId, content, userId) {
        const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`
        const result = await connection.execute(statement, [momentId, content, userId])
        return result
    }

    async reply(momentId, content, userId, commentId) {
        const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?);`
        const result = await connection.execute(statement, [momentId, content, userId, commentId])
        return result
    }

    async delete(id) {
        const statement = `DELETE FROM comment WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result
    }
}

module.exports = new CommentService()