/**
 * Created * 2018/3/9.
 */
const express = require('express')
const router = express.Router()

function setRouter (ctrl) {
// 兼容旧版本
  router.post('/create', ctrl.create)
  router.get('/list', ctrl.list)
  router.get('/list/:key', ctrl.list)
  router.get('/get/:id', ctrl.findOne)
  router.post('/update/:id', ctrl.updateOne)
  router.post('/delete/:id', ctrl.deleteOne)

  router.route('/')
    .get(ctrl.list)
    .post(ctrl.create)

  router.route('/:id')
    .get(ctrl.findOne)
    .patch(ctrl.updateOne)
    .delete(ctrl.deleteOne)
  return router
}

module.exports = setRouter
