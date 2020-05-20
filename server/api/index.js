const { Router } = require('express')
const version = require('./controllers/version')
const user = require('./controllers/users')

const router = Router()

router.route('/version').get(version.get)

router.get('/users/:publicAddress', user.getByAddress)

module.exports = router
