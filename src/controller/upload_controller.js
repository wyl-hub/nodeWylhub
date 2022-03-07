const fs = require('fs')
const fileService = require('../service/file_service')

class UploadController {
    async create(ctx, next) {
        const { filename, mimetype } = ctx.req.file
        const { id } = ctx.user
        // 如果表中已有该用户数据 则是修改头像 否则就是第一次上传头像
        const [avatar] = await fileService.getUserAvatar(id)
        if (avatar.length === 0) {
            await fileService.create(filename, mimetype, id)
            ctx.body = '上传头像成功'
        } else {
            await fileService.modifyAvatar(filename, mimetype, id)
            ctx.body = '修改头像成功'
        }
    }

    // 返回某个文件
    async getFile(ctx, next) {
        const { id } = ctx.request.query
        const [file] = await fileService.getFile(id)
        const { mimetype, file_name } = file[0]


        // 路径前面不能加 /  否则就会 以path为全部路径查找
        //  如果加 ./ 或者不加东西 就会在该项目根目录找
        const filePath = `uploads/picture/${file_name}`

        ctx.response.set('content-type', mimetype)
        ctx.body = fs.createReadStream(filePath)
    }

    async uploadMomentFile(ctx, next) {
        const { momentId } = ctx.request.query
        const files = ctx.req.files
        for (let file of files) {
            const { filename, mimetype } = file
            await fileService.saveFile(filename, mimetype, momentId)
        }
        ctx.body = '上传成功'
    }

}
module.exports = new UploadController()