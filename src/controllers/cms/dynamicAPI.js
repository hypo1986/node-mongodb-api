/**
 * Created * 2017/11/27.
 */
const cms = require('../../models').cms
const DynamicAPIModel = cms.DynamicAPIModel
const DAPIC = cms.DynamicAPICategoryModel
const utils = require('../../lib/util')

function create (req, res, next) {
  let fields = req.body.fields
  if (fields && utils.isObject(fields)) {
    let apiData = new DynamicAPIModel(req.body)
    apiData.save(err => {
      if (err) return next(err)
      res.json({
        success: true
      })
    })
  } else {
    return res.json({
      success: false,
      error: {
        message: 'fields字段不存在'
      }
    })
  }
}

function updateOne (req, res, next) {
  let id = req.params.id
  req.body.updateAt = new Date()
  if (!id) {
    res.json({
      success: false,
      message: 'lost id'
    })
  }
  DynamicAPIModel.update({_id: id}, req.body, {
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
  if (!id) {
    res.json({
      success: false,
      message: 'lost id'
    })
  }
  DynamicAPIModel.findOne({_id: id}, function (err, doc) {
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

  const query = req.query
  // delete query.page;
  // delete query.pageSize;
  let cond = {}
  // 兼容两种方式
  let key = query.key || req.params.key
  let filter = {}
  if (!key) {
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
    cond.key = key
  } else {
    if (query.source === 'dashboard') {
      cond.key = key
    } else {
      let now = new Date()
      filter = {
        fields: 1
      }
      cond = {
        $and: [{
          key: key,
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

  DAPIC.DynamicAPICategory.findOne({key: key}, function (err, doc) {
    if (err) {
      return res.json({
        success: false,
        data: {},
        error: {
          status: 400,
          message: '没有找到对应的KEY'
        }
      })
    }
    DynamicAPIModel.find(cond, filter).sort({sort: -1}).paginate(page, pageSize, function (err, data, total) {
      if (err) {
        return res.json({
          success: false,
          data: {},
          error: {
            status: 400,
            message: '查询错误'
          }
        })
      }
      let isList = true
      if (doc && doc.dataMode !== 'list') {
        isList = false
      }

      if (isList) {
        let _results = []
        if (query.source && query.source === 'dashboard') {
          _results = data
        } else {
          _.forEach(data, (item) => {
            _results.push(item.fields || {})
          })
        }
        res.json({
          success: true,
          data: {
            results: _results,
            page: page,
            pageSize: pageSize,
            totalSize: total
          }
        })
      } else {
        let _data = {}
        if (query.source && query.source === 'dashboard') {
          _data = data.length ? data[0] : {}
        } else {
          _data = data.length ? data[0].fields : {}
        }
        let d = {totalSize: total}
        try {
          _.merge(d, _data.toObject())
        } catch (e) {
          d = _data
        }
        res.json({
          success: true,
          data: d
        })
      }
    })
  })

  // Promise.all([
  //   DAPIC.DynamicAPICategory.findOne({key: key}),
  //   DynamicAPIModel.find(cond, filter).sort({sort: -1}).paginate(page, pageSize)
  // ]).then(results => {
  //   let doc = results[0]
  //   let data = results[1]
  //   console.log(results)
  //   let isList = true
  //   if (doc && doc.dataMode !== 'list') {
  //     isList = false
  //   }
  //
  //   if (isList) {
  //     let _results = []
  //     if (query.source && query.source === 'dashboard') {
  //       _results = data
  //     } else {
  //       _.forEach(data, (item) => {
  //         _results.push(item.fields || {})
  //       })
  //     }
  //     res.json({
  //       success: true,
  //       data: {
  //         results: _results,
  //         page: page,
  //         pageSize: pageSize,
  //         totalSize: data.total
  //       }
  //     })
  //   } else {
  //     let _data = {}
  //     if (query.source && query.source === 'dashboard') {
  //       _data = data.length ? data[0] : {}
  //     } else {
  //       _data = data.length ? data[0].fields : {}
  //     }
  //     res.json({
  //       success: true,
  //       data: _data
  //     })
  //   }
  // }).catch(err => {
  //   console.log(err, 'err')
  //   res.json({
  //     success: false,
  //     data: {},
  //     error: {
  //       status: 400,
  //       message: '没有找到对应的KEY'
  //     }
  //   })
  // })
}

function deleteOne (req, res, next) {
  let id = req.params.id
  DynamicAPIModel.remove({_id: id}, function (err) {
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
