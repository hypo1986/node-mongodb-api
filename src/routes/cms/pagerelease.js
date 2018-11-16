/**
 * Created * 2017/5/12.
 */
const express = require('express');
const router = express.Router();
const pageReleaseCtrl = require('../../controllers').cms.pageRelease;

// 兼容旧版本
router.post('/create', pageReleaseCtrl.create);
router.get('/list', pageReleaseCtrl.list);
router.get('/get/:id', pageReleaseCtrl.findOne);
router.get('/getReleaseByCode/:pageCode', pageReleaseCtrl.getReleaseByCode);
router.post('/update/:id', pageReleaseCtrl.updateOne);
router.post('/delete/:id', pageReleaseCtrl.deleteOne);
router.get('/query', pageReleaseCtrl.query);

/**
 * 新API规范
 */

router.route('/')
  .get(pageReleaseCtrl.list)
  .post(pageReleaseCtrl.create);

router.route('/:id')
  .get(pageReleaseCtrl.findOne)
  .patch(pageReleaseCtrl.updateOne)
  .delete(pageReleaseCtrl.deleteOne);

module.exports = router;
