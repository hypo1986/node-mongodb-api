/**
 * Created * 2017/5/26.
 */
const express = require('express')
const router = express.Router()

const imageTextCategoryCtrl = require('../../controllers').cms.imageTextCategory
// const imageTextCategoryCtrl = cms.imageTextCategoryCtrl;

// 兼容旧版本
router.post('/create', imageTextCategoryCtrl.create)
router.get('/list', imageTextCategoryCtrl.list)
router.get('/get/:id', imageTextCategoryCtrl.findOne)
router.post('/update/:id', imageTextCategoryCtrl.updateOne)
router.post('/delete/:id', imageTextCategoryCtrl.deleteOne)

router.route('/')
  .get(imageTextCategoryCtrl.list)
  .post(imageTextCategoryCtrl.create)

router.route('/:id')
  .get(imageTextCategoryCtrl.findOne)
  .patch(imageTextCategoryCtrl.updateOne)
  .delete(imageTextCategoryCtrl.deleteOne)

module.exports = router
