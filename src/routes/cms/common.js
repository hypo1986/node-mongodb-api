/**
 * Created * 2017/5/17.
 */
const express = require('express')
const router = express.Router()
const commonCtrl = require('../../controllers').cms.common

// 兼容旧版本
router.post('/create', commonCtrl.create)
router.get('/list', commonCtrl.list)
router.get('/get/:id', commonCtrl.findOne)
router.post('/update/:id', commonCtrl.updateOne)
router.post('/delete/:id', commonCtrl.deleteOne)
/**
 * 新API规范
 */

router.route('/')
  .get(commonCtrl.list)
  .post(commonCtrl.create)

router.route('/:id')
  .get(commonCtrl.findOne)
  .patch(commonCtrl.updateOne)
  .delete(commonCtrl.deleteOne)

module.exports = router
