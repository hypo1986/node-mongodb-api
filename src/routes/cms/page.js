/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()
const pageCtrl = require('../../controllers').cms.page

// 兼容旧版本
router.post('/create', pageCtrl.create)
router.get('/list', pageCtrl.list)
router.get('/get/:id', pageCtrl.findOne)
router.post('/update/:id', pageCtrl.updateOne)
router.post('/delete/:id', pageCtrl.deleteOne)
router.get('/query', pageCtrl.query)

/**
 * 新API规范
 */

router.route('/')
  .get(pageCtrl.list)
  .post(pageCtrl.create)

router.route('/:id')
  .get(pageCtrl.findOne)
  .patch(pageCtrl.updateOne)
  .delete(pageCtrl.deleteOne)

module.exports = router
