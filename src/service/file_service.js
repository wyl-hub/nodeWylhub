const connection = require('../app/database')

class FileService {
    async create(filename, mimetype, userId) {
        const statement = `INSERT INTO avatar (file_name, mimetype, user_id) VALUES (?, ?, ?);`
        const result = await connection.execute(statement, [filename, mimetype, userId])
        return result
    }

    async getUserAvatar(id) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const result = await connection.execute(statement, [id])
        return result
    }

    async modifyAvatar(filename, mimetype, userId) {
        const statement = `UPDATE avatar SET file_name = ?, mimetype = ? WHERE user_id = ?;`
        const result = await connection.execute(statement, [filename, mimetype, userId])
        return result
    }

    async getFile(id) {
        const statement = `SELECT * FROM file WHERE id = ?;`
        const result = await connection.execute(statement, [id])
        return result
    }

    async saveFile(filename, mimetype, momentId) {
        const statement = `INSERT INTO file (file_name, mimetype, moment_id) VALUES (?, ?, ?);`
        const result = await connection.execute(statement, [filename, mimetype, momentId])
        return result
    }
}


module.exports = new FileService()