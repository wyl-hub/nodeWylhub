const throwError = require('../utils/throwError')
const { ERROR_OPT } = require('../utils/contans')
const momentService = require('../service/moment_service')
const authService = require('../service/auth_service')
class MomentController {
  // 发布动态
  async create(ctx, next) {
    const user = ctx.user
    const { content } = ctx.request.body
    const [result] = await momentService.create(user.id, content)
    ctx.body = result
  }

  // 获取动态详情
  async getDetail(ctx, next) {
    const [result] = await momentService.getDetail(ctx.query.id)
    ctx.body = result
  }

  // 获取动态列表
  async getMomentList(ctx, next) {
    const { offset, size } = ctx.request.query
    const [result] = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  // 修改动态
  async updateMoment(ctx, next) {
    const { id } = ctx.request.query
    const { content } = ctx.request.body
    // 修改动态
    const optResult = await momentService.updateMoment(id, content)
    ctx.body = optResult
  }

  async deleteMoment(ctx, next) {
    const { id } = ctx.request.query
    // 删除动态
    const result = await momentService.deleteMoment(id)
    ctx.body = result
  }

}

module.exports = new MomentController()