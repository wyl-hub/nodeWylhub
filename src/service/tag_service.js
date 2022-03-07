const connection = require('../app/database')
class TagService {
    async create(name) {
        const statement = `INSERT INTO tag (name) VALUES (?);`
        const result = await connection.execute(statement, [name])
        return result
    }

    async getTagByName(name) {
        const statement = `SELECT * FROM tag WHERE name = ?;`
        const result = await connection.execute(statement, [name])
        return result
    }

    async existMomentAndTag(momentId, tagId) {
        const statement = `SELECT * FROM moment_tag WHERE moment_id = ? AND tag_id = ?`
        const result = await connection.execute(statement, [momentId, tagId])
        return result
    }

    async addTagForMoment(momentId, tagId) {
        const statement = `INSERT INTO moment_tag (moment_id, tag_id) VALUES (?, ?);`
        const result = await connection.execute(statement, [momentId, tagId])
        return result
    }

    async getTagList(id) {
        const statement = `SELECT t.id id, t.name name FROM moment_tag mt LEFT JOIN tag t ON mt.tag_id = t.id WHERE mt.moment_id = ?;`
        const result = await connection.execute(statement, [id])
        return result
    }
}

module.exports = new TagService()