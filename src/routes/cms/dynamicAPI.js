/**
 * Created * 2017/11/24.
 */
const express = require('express')
const router = express.Router()

const dynamicAPI = require('../../controllers').cms.dynamicAPI

// 兼容旧版本
router.post('/create', dynamicAPI.create)
router.get('/list', dynamicAPI.list)
router.get('/list/:key', dynamicAPI.list)
router.get('/get/:id', dynamicAPI.findOne)
router.post('/update/:id', dynamicAPI.updateOne)
router.post('/delete/:id', dynamicAPI.deleteOne)

router.route('/')
  .get(dynamicAPI.list)
  .post(dynamicAPI.create)

router.route('/:id')
  .get(dynamicAPI.findOne)
  .patch(dynamicAPI.updateOne)
  .delete(dynamicAPI.deleteOne)

module.exports = router
