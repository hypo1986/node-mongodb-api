/**
 * Created by lvxin on 2017/4/1.
 */
const express = require('express');
const router = express.Router();
const pagePreviewCtrl = require('../../controllers').cms.pagePreview;

// 兼容旧版本
router.post('/create', pagePreviewCtrl.create);
router.get('/list', pagePreviewCtrl.list);
router.get('/get/:id', pagePreviewCtrl.findOne);
router.post('/update/:id', pagePreviewCtrl.updateOne);
router.post('/delete/:id', pagePreviewCtrl.deleteOne);
// router.get('/query', pagePreviewCtrl.query);

/**
 * 新API规范
 */

router.route('/')
  .get(pagePreviewCtrl.list)
  .post(pagePreviewCtrl.create);

router.route('/:id')
  .get(pagePreviewCtrl.findOne)
  .patch(pagePreviewCtrl.updateOne)
  .delete(pagePreviewCtrl.deleteOne);

module.exports = router;
