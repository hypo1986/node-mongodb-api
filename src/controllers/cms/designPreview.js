const models = require('../../models/cms/index')
const dbHelper = require('../../lib/dbHelper')

function create (req, res, next) {
  const db = new models.DesignPreviewModel(req.body)
  db.save(function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function updateOne (req, res, next) {
  const id = req.params.id
  models.DesignPreviewModel.update({pageId: id}, req.body, {upsert: true, safe: true}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function deleteOne (req, res, next) {
  const id = req.params.id
  models.DesignPreviewModel.remove({pageId: id}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function findOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.DesignPreviewModel.find({pageId: id}).populate('project').exec(function (err, data) {
    if (data && data[0]) {
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
  let pageData = {}
  models.DesignPreviewModel.find(queryParams)
    .sort({publishAt: 'desc'})
    .populate('project')
    .paginate(page, pageSize, (err, data, total) => {
      pageData.totalSize = total
      pageData.page = page
      pageData.pageSize = pageSize
      pageData.results = data
      if (err) return next(err)
      res.json({
        success: true,
        data: pageData
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
