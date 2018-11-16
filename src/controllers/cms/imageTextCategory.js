/**
 * Created * 2017/5/26.
 */
'use strict'

const cms = require('../../models').cms
const ImageTextCategoryModel = cms.ImageTextCategoryModel
const ImageTextModel = cms.ImageTextModel

function create (req, res, next) {
  let model = new ImageTextCategoryModel(req.body)
  model.save(function (err, doc) {
    if (err) return next(err)
    res.json({
      success: true,
      data: doc
    })
  })
}

function updateOne (req, res, next) {
  let id = req.params.id
  req.body.updateAt = new Date()

  ImageTextCategoryModel.findOne({_id: id}, function (err, doc) {
    if (err) return next(err)
    if (doc) {
      let key = doc.key
      ImageTextCategoryModel.update({_id: id}, req.body, {
        upsert: true,
        safe: true
      }, (err, data) => {
        if (err) return next(err)
        // 同时更新imagetext表
        ImageTextModel.update({key: key}, {key: req.body.key}, (err, result) => {
          if (err) return next(err)
          res.json({
            success: true,
            data: data
          })
        })
      })
    } else {
      res.json({
        success: false
      })
    }
  })
}

function findOne (req, res, next) {
  let id = req.params.id
  ImageTextCategoryModel.findOne({_id: id}, function (err, doc) {
    if (err) return next(err)
    res.json({
      success: true,
      data: doc
    })
  })
}

function list (req, res, next) {
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 1000
  let cond = {}
  if (req.query.keywords) {
    const reg = new RegExp(req.query.keywords, 'i') // 不区分大小写
    cond = {
      name: reg
    }
  }
  ImageTextCategoryModel
    .find(cond).sort({updateAt: -1})
    .paginate(page, pageSize, (err, docs, total) => {
      if (err) return next(err)
      res.json({
        success: true,
        data: {
          results: docs,
          page: page,
          pageSize: pageSize,
          totalSize: total
        }
      })
    })
}

function deleteOne (req, res, next) {
  let id = req.params.id
  ImageTextCategoryModel.findOne({_id: id}, function (err, doc) {
    if (err) return next(err)
    if (doc) {
      ImageTextModel.remove({key: doc.key}, function (err) {
        if (err) return next(err)
        ImageTextCategoryModel.remove({_id: id}, function (err) {
          if (err) return next(err)
          res.json({
            success: true
          })
        })
      })
    } else {
      res.json({
        success: false
      })
    }
  })
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne
}
