const connection = require('../app/database')
class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        const result = await connection.execute(statement, [content, userId])
        return result
    }

    async getDetail(id) {
        const statement = `SELECT m.id momentId, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM moment m 
        LEFT JOIN users u ON m.user_id = u.id
        WHERE m.id = ?;`
        const result = await connection.execute(statement, [id])
        return result
    }

    async getMomentList(offset, size) {
        const statement = `SELECT m.id momentId, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_tag mt WHERE mt.moment_id = m.id) tagCount
        FROM moment m 
        LEFT JOIN users u ON m.user_id = u.id
        LIMIT ?, ?;`
        // offset 跳过多少条数据 查之后的数据  前端分页计算传过来
        const result = connection.execute(statement, [offset, size])
        return result
    }

    async updateMoment(momentId, content) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const result = connection.execute(statement, [content, momentId])
        return result

    }

    async deleteMoment(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?;`
        const result = await connection.execute(statement, [momentId])
        return result
    }

    async getMomentAndComment(momentId) {
        const statement = `
        SELECT m.id momentId, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'createTime', c.createAt, 'commentId', c.comment_id,
                'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
            )
        ) commentList
        FROM moment m 
        LEFT JOIN users u ON m.user_id = u.id
        LEFT JOIN comment c ON m.id = c.moment_id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE m.id = ? GROUP BY m.id;`
        const result = await connection.execute(statement, [momentId])
        return result
    }
}

module.exports = new MomentService()