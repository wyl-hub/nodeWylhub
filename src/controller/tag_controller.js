const tagService = require('../service/tag_service')

class TagController {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await tagService.create(name)
        ctx.body = result
    }

    async getTagList(ctx, next) {
        const { id } = ctx.request.query
        const [result] = await tagService.getTagList(id)
        ctx.body = result
    }
}


module.exports = new TagController()