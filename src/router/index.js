const fs = require('fs')


const useRouter = function() {
  fs.readdirSync(__dirname).forEach(item => {
    if (item === 'index.js') return
    const router = require(`./${item}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}


module.exports = useRouter