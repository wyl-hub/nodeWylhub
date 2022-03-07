const multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../utils/filePath')

const avatarUpload = multer({
    dest: './uploads/avatar'
})

const pictureUpload = multer({
    dest: './uploads/picture'
})

const avatarHandle = avatarUpload.single('avatar')
const momentFileHandle = pictureUpload.array('picture', 9)

module.exports = {
    avatarHandle,
    momentFileHandle
}