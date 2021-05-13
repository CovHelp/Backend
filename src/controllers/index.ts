var express = require('express')
var router = express.Router()

router.use('/v1/users', require('./User'));
router.use('/v1/posts', require('./Post'));
router.use('/v1/misc', require('./misc'));
router.use('/v1/channel', require('./channel'));
router.use('/v1/org', require('./organization'))

module.exports = router;