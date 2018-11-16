/**
 * Created by likaihua on 2017/3/21.
 */

const models = require('../../models/cms/index')
const dbHelper = require('../../lib/dbHelper')

function create (req, res, next) {
  const db = new models.ProjectModel(req.body)
  db.save(function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function updateOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.ProjectModel.update({_id: id}, req.body, {upsert: true, safe: true}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function deleteOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.ProjectModel.remove({_id: id}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function findOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.ProjectModel.find({_id: id}, function (err, data) {
    if (data && data.length > 0) {
      res.json({
        success: true,
        data: data[0]
      })
    } else {
      res.json({
        success: false,
        error: {
          message: '没有查到匹配的项目'
        }
      })
    }
  })
}

function list (req, res, next) {
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || null

  const queryParams = req.query
  delete queryParams.page
  delete queryParams.pageSize

  dbHelper.pageQuery(page, pageSize, models.ProjectModel, '', queryParams, {
    createdAt: 'desc'
  }, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne
}
