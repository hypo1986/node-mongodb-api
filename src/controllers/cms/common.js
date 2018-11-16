/**
 * Created * 2017/5/12.
 */
const models = require('../../models/cms')

const dbHelper = require('../../lib/dbHelper')
const _ = require('lodash')

function create (req, res, next) {
  models.commonModel.findOne({}, function (err, doc) {
    if (err) {
      return res.json({
        success: false
      })
    }
    if (doc) {
      // update
      var id = doc._id
      delete doc._id
      req.body = doc
      req.params.id = id
      updateOne(req, res, next)
    } else {
      const db = new models.commonModel(req.body)
      db.save(function (err, data) {
        if (err) return next(err)
        res.json({
          success: true,
          data: data
        })
      })
    }
  })
}

function updateOne (req, res, next) {
  const id = req.params.id
  models.commonModel.update({_id: id}, _.assign(req.body, {updateAt: new Date()}), {
    upsert: true,
    safe: true
  }, function (err, data) {
    if (err) return next(err)
    models.commonModel.findOne({_id: id}, function (err, doc) {
      if (err) return next(err)
      res.json({
        success: true,
        data: doc
      })
    })
  })
}

function deleteOne (req, res, next) {
  const id = req.params.id
  models.commonModel.remove({_id: id}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function findOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.commonModel.findOne({_id: id}).populate('project').exec((err, data) => {
    if (data) {
      res.json({
        success: true,
        data: data
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

  dbHelper.pageQuery(page, pageSize, models.commonModel, '', queryParams, {
    updateAt: 'desc'
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
