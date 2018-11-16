const models = require('../../models/cms/index')
const DesignBackupsModel = models.DesignBackupModel

function create (req, res, next) {
  const db = new DesignBackupsModel(req.body)
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
  DesignBackupsModel.update({pageId: id}, req.body, {upsert: true, safe: true}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function deleteOne (req, res, next) {
  const id = req.params.id
  DesignBackupsModel.remove({_id: id}, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function findOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  DesignBackupsModel.find({pageId: id}).populate('project').exec(function (err, data) {
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

  DesignBackupsModel
    .find(queryParams).sort({publishAt: -1})
    .populate('project')
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

function doRollback (req, res, next) {
  let id = req.params.id
  DesignBackupsModel.findOne({_id: id}, (err, backups) => {
    if (err) return next(err)
    var data = backups.toObject()
    delete data._id
    models.DesignReleaseModel.update({pageId: backups.pageId}, data, (err, doc) => {
      if (err) return next(err)
      res.json({
        success: true,
        data: doc
      })
    })
  })
}

function query (req, res, next) {
  const domain = req.query.domain
  const path = req.query.path
  if (!domain || !path) {
    res.json({
      success: false,
      error: {
        message: '参数不正确'
      }
    })
  }
  DesignBackupsModel.find({pagePath: path, type: 'web'}).populate('project').exec(function (err, data) {
    data = global._.find(data, function (obj) {
      return obj.project && obj.project.link === domain
    })
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

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne,
  query,
  doRollback
}
