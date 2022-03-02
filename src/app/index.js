const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./errorHandler')
const useRrouter = require('../router')
const app = new Koa()
app.useRrouter= useRrouter



app.use(bodyParser())
app.useRrouter()
app.on('error', errorHandle)
module.exports = app