const mysql = require('mysql2')
const config = require('./config')


const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_ROOT,
  password: config.MYSQL_PASSWORD,
})

// 连接是否成功
connection.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('连接数据库失败')
    } else {
      console.log('连接数据库成功')
    }
  })
})

module.exports = connection.promise()