/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers').permission.user

/**
 * 新API规范
 */

router.get('/profile', userCtrl.getUserInfo)
router.get('/list', userCtrl.getUserList)
router.get('/getById', userCtrl.getUserById)
router.get('/queryUser', userCtrl.queryUser)
router.post('/assignRole', userCtrl.assignRole)

module.exports = router
