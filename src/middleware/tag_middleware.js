const tagService = require('../service/tag_service')

const ifExist = async (ctx, next) => {
    const { id } = ctx.request.query
    const { tagList } = ctx.request.body
    let tagIdList = []
    // 如果标签存在 则存入该标签id  否则创建标签并存入其id
    for (tag of tagList) {
        const [existFlag] = await tagService.getTagByName(tag)
        if (existFlag.length > 0) {
            tagIdList.push(existFlag[0].id)
        } else {
           const result = await tagService.create(tag)
           tagIdList.push(result[0].insertId)
        }
    }


    // 判断该动态是否已有该标签 有则跳过 否则关联
    for (tagId of tagIdList) {
        const [existFlag] = await tagService.existMomentAndTag(id, tagId)
        if (existFlag.length === 0) {
            await tagService.addTagForMoment(id, tagId)
        }
    }

    await next()
}


module.exports = {
    ifExist
}