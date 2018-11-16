/**
 * Created * 2017/5/12.
 */
const express = require('express');
const router = express.Router();
const projectCtrl = require('../../controllers').cms.project;

// 兼容旧版本
router.post('/create', projectCtrl.create);
router.get('/list', projectCtrl.list);
router.get('/get/:id', projectCtrl.findOne);
router.post('/update/:id', projectCtrl.updateOne);
router.post('/delete/:id', projectCtrl.deleteOne);

/**
 * 新API规范
 */

router.route('/')
  .get(projectCtrl.list)
  .post(projectCtrl.create);

router.route('/:id')
  .get(projectCtrl.findOne)
  .patch(projectCtrl.updateOne)
  .delete(projectCtrl.deleteOne);

module.exports = router;
