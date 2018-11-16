/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()
const user = require('./user')
const role = require('./role')
const action = require('./action')
const permission = require('./permission')

router.use('/user', user)
router.use('/role', role)
router.use('/action', action)
router.use('/permission', permission)

module.exports = router
