/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()

const imageTextCtrl = require('../../controllers').cms.imageText

// 兼容旧版本
router.post('/create', imageTextCtrl.create)
router.get('/list', imageTextCtrl.list)
router.get('/get/:id', imageTextCtrl.findOne)
router.post('/update/:id', imageTextCtrl.updateOne)
router.post('/delete/:id', imageTextCtrl.deleteOne)

router.route('/')
  .get(imageTextCtrl.list)
  .post(imageTextCtrl.create)

router.route('/:id')
  .get(imageTextCtrl.findOne)
  .patch(imageTextCtrl.updateOne)
  .delete(imageTextCtrl.deleteOne)

module.exports = router
