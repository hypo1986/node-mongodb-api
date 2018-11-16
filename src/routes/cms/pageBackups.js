/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()
const pageBackupsCtrl = require('../../controllers').cms.pageBackups

// 兼容旧版本
router.post('/create', pageBackupsCtrl.create)
router.get('/list', pageBackupsCtrl.list)
router.get('/get/:id', pageBackupsCtrl.findOne)
router.post('/rollback/:id', pageBackupsCtrl.doRollback)
router.post('/update/:id', pageBackupsCtrl.updateOne)
router.post('/delete/:id', pageBackupsCtrl.deleteOne)
router.get('/query', pageBackupsCtrl.query)

/**
 * 新API规范
 */

router.route('/')
  .get(pageBackupsCtrl.list)
  .post(pageBackupsCtrl.create)

router.route('/:id')
  .get(pageBackupsCtrl.findOne)
  .patch(pageBackupsCtrl.updateOne)
  .delete(pageBackupsCtrl.deleteOne)

module.exports = router
