function throwError(type, ctx) {
  const error = new Error(type)
  return ctx.app.emit('error', error, ctx)
}


module.exports = throwError