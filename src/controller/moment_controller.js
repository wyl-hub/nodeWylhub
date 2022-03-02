class MomentController {
  async create(ctx, next) {
    const user = ctx.user
    console.log(user)
    ctx.body = '消息发送成功'
  }
}

module.exports = new MomentController()