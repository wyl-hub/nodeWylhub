const commentService = require('../service/comment_service')
class CommentController {
    // 发表评论(评论动态)   momentId  userId content
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { id } = ctx.user
        const result = await commentService.create(momentId, content, id)
        ctx.body = result
    }

    // 回复评论
    async reply(ctx, next) {
        const { momentId, content, commentId } = ctx.request.body
        const { id } = ctx.user
        const result = await commentService.reply(momentId, content, id, commentId)
        ctx.body = result
    }

    async deleteComment(ctx, next) {
        const { id } = ctx.request.query
        const result = await commentService.delete(id)
        ctx.body = result
    }
}

module.exports = new CommentController()