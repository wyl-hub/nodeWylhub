const app = require('./app')
const config = require('./app/config')
const connection = require('./app/database')

// npm i dotenv   加载.env 文件中的配置项
app.listen(config.APP_PORT, () => {
  console.log('koa running~~')
})