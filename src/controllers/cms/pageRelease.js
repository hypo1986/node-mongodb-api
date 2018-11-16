/**
 * Created by lvxin on 2017/4/1.
 */
const models = require('../../models/cms/index');
const dbHelper = require('../../lib/dbHelper');

function create (req, res, next) {
  const db = new models.PageReleaseModel(req.body);
  db.save(function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function updateOne (req, res, next) {
  const id = req.params.id;
  models.PageReleaseModel.update({pageId: id}, req.body, {upsert: true, safe: true}, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function deleteOne (req, res, next) {
  const id = req.params.id;
  models.PageReleaseModel.remove({pageId: id}, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function findOne (req, res, next) {
  const id = req.params.id; // 获取到项目ID
  models.PageReleaseModel.find({pageId: id}).populate('project').exec(function (err, data) {
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
}

function list (req, res, next) {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || null;

  const queryParams = req.query;
  delete queryParams.page;
  delete queryParams.pageSize;

  dbHelper.pageQuery(+page, +pageSize, models.PageReleaseModel, 'project', queryParams, {
    publishAt: 'desc'
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function getReleaseByCode (req, res, next) {
  models.PageReleaseModel.findOne({pageCode: (req.params && req.params.pageCode) || ''}, function (err, data) {
    if (!err && data) {
      res.json({
        success: true,
        data: data
      });
    } else {
      res.json({
        success: false,
        data: null,
        error: {
          message: '没有查到匹配的项目'
        }
      });
    }
  });
}

function query (req, res, next) {
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
  models.PageReleaseModel.find({pagePath: path, type: 'web'}).populate('project').exec(function (err, data) {
    data = global._.find(data, function (obj) {
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
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne,
  query,
  getReleaseByCode
};
