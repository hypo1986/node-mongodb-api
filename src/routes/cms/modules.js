/**
 * Created * 2017/5/17.
 */
const express = require('express')
const router = express.Router()
const moduleCtrl = require('../../controllers').cms.modules

// 兼容旧版本
router.post('/create', moduleCtrl.create)
router.get('/list', moduleCtrl.list)
router.get('/get/:id', moduleCtrl.findOne)
router.post('/update/:id', moduleCtrl.updateOne)
router.post('/delete/:id', moduleCtrl.deleteOne)

/**
 * 新API规范
 */

router.route('/')
  .get(moduleCtrl.list)
  .post(moduleCtrl.create)

router.route('/:id')
  .get(moduleCtrl.findOne)
  .patch(moduleCtrl.updateOne)
  .delete(moduleCtrl.deleteOne)

module.exports = router
