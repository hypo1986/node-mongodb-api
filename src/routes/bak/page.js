/**
 * Created by lvxin on 2017/4/1.
 */

const models = require('../models/cms/index');
const express = require('express');
const router = express.Router();

const dbHelper = require('../lib/dbHelper');
const async = require('async');
const _ = require('lodash');

router.post('/create', function (req, res, next) {
  const db = new models.PageModel(req.body);
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
  models.PageModel.update({_id: id}, _.assign(req.body, {updateAt: new Date()}), {
    upsert: true,
    safe: true
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

router.post('/delete/:id', function (req, res, next) {
  const id = req.params.id;

  async.parallel([
    function (cb) {
      models.PageReleaseModel.remove({pageId: id}, function (err) {
        cb(err);
      });
    },
    function (cb) {
      models.PagePreviewModel.remove({pageId: id}, function (err) {
        cb(err);
      });
    }
  ], function (err, results) {
    if (err) {
      return res.json({
        success: false,
        error: {
          message: '删除失败'
        }
      });
    }
    models.PageModel.remove({_id: id}, function (err, data) {
      if (err) return next(err);
      res.json({
        success: true,
        data: data
      });
    });
  });
});

router.get('/get/:id', function (req, res, next) {
  const id = req.params.id; // 获取到项目ID
  models.PageModel.findOne({_id: id}).populate('project').exec(function (err, data) {
    if (data) {
      res.json({
        success: true,
        data: data
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

  if (req.query.keyword) {
    queryParams.$or = [{
      pageName: new RegExp(req.query.keyword, 'i')
    }, {
      pagePath: new RegExp(req.query.keyword, 'i')
    }];
    delete queryParams.keyword;
  }

  dbHelper.pageQuery(+page, +pageSize, models.PageModel, 'project', queryParams, {
    updateAt: 'desc'
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
});

router.get('/query', function (req, res, next) {
  const domain = req.query.domain;
  const path = req.query.path;
  if (!domain || !path) {
    res.json({
      success: false,
      error: {
        message: '参数不正确'
      }
    });
  }
  models.PageModel.find({pagePath: path}).populate('project').exec(function (err, data) {
    data = _.find(data, function (obj) {
      return obj.project && obj.project.link === domain;
    });
    if (data) {
      res.json({
        success: true,
        data: data
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

module.exports = router;
