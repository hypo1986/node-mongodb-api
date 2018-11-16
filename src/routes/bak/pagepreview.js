/**
 * Created by lvxin on 2017/4/1.
 */
const models = require('../models/cms/index');
const express = require('express');
const router = express.Router();
const dbHelper = require('../lib/dbHelper');

router.post('/create', function (req, res, next) {
  const db = new models.PagePreviewModel(req.body);
  db.save(function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

router.post('/update/:id', function (req, res, next) {
  const id = req.params.id;
  models.PagePreviewModel.update({pageId: id}, req.body, {upsert: true, safe: true}, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

router.post('/delete/:id', function (req, res, next) {
  const id = req.params.id;
  models.PagePreviewModel.remove({pageId: id}, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

router.get('/get/:id', function (req, res, next) {
  const id = req.params.id; // 获取到项目ID
  models.PagePreviewModel.find({pageId: id}).populate('project').exec(function (err, data) {
    if (data && data[0]) {
      res.json({
        success: true,
        data: data[0]
      });
    } else {
      res.json({
        success: false,
        error: {
          message: '没有查到匹配的项目'
        }
      });
    }
  });
});

router.get('/list', function (req, res, next) {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || null;

  const queryParams = req.query;
  delete queryParams.page;
  delete queryParams.pageSize;

  dbHelper.pageQuery(+page, +pageSize, models.PagePreviewModel, 'project', queryParams, {
    publishAt: 'desc'
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

module.exports = router;
