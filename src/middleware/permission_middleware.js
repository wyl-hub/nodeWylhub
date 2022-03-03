const throwError = require('../utils/throwError')
const authService = require('../service/auth_service')
const { ERROR_OPT } = require('../utils/contans')

// 动态验证权限   可能要验证各种权限  闭包实现
const verifyPermission = tableName => {
    return async (ctx, next) => {
        const { id } = ctx.request.query
        const { id: userId } = ctx.user
        const permission = await authService.checkMoment(tableName, id, userId)
        if (!permission) return throwError(ERROR_OPT, ctx)
        await next()
    }
}


module.exports = {
    verifyPermission
}