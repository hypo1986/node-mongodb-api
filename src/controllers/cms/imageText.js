/**
 * Created * 2017/5/12.
 */
'use strict'

const ImageTextModel = require('../../models').cms.ImageTextModel
const util = require('../../lib/util')

function create (req, res, next) {
  // model 验证
  // let model = new ImageTextModel(req.body);
  // model.save(function (err, doc) {
  //   if (err) return next(err);
  //   res.json({
  //     success: true,
  //     data: doc
  //   });
  // });
  if (util.isObject(req.body) && !req.body.key) {
    return res.json({
      success: false,
      error: {
        message: 'lost `key`'
      }
    })
  }
  // 批量插入
  let data = []
  if (Array.isArray(req.body) && data.length > 0) {
    let model
    let body
    req.body.forEach(function (item) {
      model = new ImageTextModel(item)
      body = Object.assign(item, model._doc)
      data.push(body)
    })
  } else {
    let model = new ImageTextModel(req.body)
    let body = Object.assign(req.body, model._doc)
    data = [body]
  }

  if (data.length > 0) {
    ImageTextModel.create(data, function (err, docs) {
      if (err) return next(err)
      res.json({
        success: true,
        data: docs
      })
    })
  } else {
    return res.json({
      success: false,
      error: {
        message: '参数错误'
      }
    })
  }
}

function updateOne (req, res, next) {
  let id = req.params.id
  req.body.updateAt = new Date()
  ImageTextModel.update({_id: id}, req.body, {
    upsert: true,
    safe: true
  }, (err, data) => {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function findOne (req, res, next) {
  let id = req.params.id
  ImageTextModel.findOne({_id: id}, function (err, doc) {
    if (err) return next(err)
    res.json({
      success: true,
      data: doc
    })
  })
}

function list (req, res, next) {
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 10

  const query = req.query
  console.log(req.query.key, 'key----')
  // delete query.page;
  // delete query.pageSize;
  let cond = {}
  let filter = {}
  if (!query.key) {
    return res.json({
      success: false,
      error: {
        message: 'lost `key` '
      }
    })
  }
  if (query.type) {
    cond.type = query.type
  }
  // preview 和 online 只能选其一
  if (query.preview) {
    cond.preview = true
    cond.key = query.key
  } else {
    if (query.source === 'dashboard') {
      cond.key = query.key
    } else {
      let now = new Date()
      filter = {
        _id: 0,
        user: 0,
        preview: 0,
        updateAt: 0,
        startTime: 0,
        endTime: 0,
        createAt: 0,
        online: 0,
        timer: 0
      }
      cond = {
        $and: [{
          key: query.key,
          $or: [
            {
              online: true
            },
            {
              $and: [
                {
                  timer: true,
                  startTime: {
                    $lte: now
                  },
                  endTime: {
                    $gte: now
                  }
                }
              ]
            }
          ]
        }]
      }
    }
  }
  ImageTextModel
    .find(cond, filter).sort({sort: -1})
    .paginate(page, pageSize, (err, docs, total) => {
      if (err) return next(new Error('未找到数据'))
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
  ImageTextModel.remove({_id: id}, function (err) {
    if (err) return next(err)
    res.json({
      success: true
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
