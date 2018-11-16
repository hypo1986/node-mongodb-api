/**
 * Created * 2018/2/28.
 */
// const cms = require('../../models').cms
// const DynamicAPIModel = cms.DynamicAPIModel
// const DAPIC = cms.DynamicAPICategoryModel
// const utils = require('../../lib/util')

const models = require('../../models/cms')
const roleModel = require('../../models/permission/role')

const async = require('async')
const _ = require('lodash')

function create (req, res, next) {
  const db = new models.DesignModel(req.body)
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
  models.DesignModel.update({_id: id}, _.assign(req.body, {updateAt: new Date()}), {
    upsert: true,
    safe: true
  }, function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function deleteOne (req, res, next) {
  const id = req.params.id

  async.parallel([
    function (cb) {
      models.DesignReleaseModel.remove({pageId: id}, function (err) {
        cb(err)
      })
    },
    function (cb) {
      models.DesignPreviewModel.remove({pageId: id}, function (err) {
        cb(err)
      })
    }
  ], function (err, results) {
    if (err) {
      return res.json({
        success: false,
        error: {
          message: '删除失败'
        }
      })
    }
    models.DesignModel.remove({_id: id}, function (err, data) {
      if (err) return next(err)
      res.json({
        success: true,
        data: data
      })
    })
  })
}

function findOne (req, res, next) {
  const id = req.params.id // 获取到项目ID
  models.DesignModel.findOne({_id: id}).populate('project').exec(function (err, data) {
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

  if (req.query.keyword) {
    queryParams.$or = [{
      pageName: new RegExp(req.query.keyword, 'i')
    }, {
      pagePath: new RegExp(req.query.keyword, 'i')
    }, {
      pageCode: new RegExp(req.query.keyword, 'i')
    }]
  }
  if (req.query.role) {
    queryParams.roles = {$all: [req.query.role]}
  }
  delete queryParams.keyword
  delete queryParams.role

  let pageData = null
  let allRoles = null
  async.parallel([
    function (cb) {
      models.DesignModel.find(queryParams)
        .sort({updateAt: 'desc'})
        .populate('project')
        .paginate(page, pageSize, (err, data, total) => {
          pageData.totalSize = total
          pageData.page = page
          pageData.pageSize = pageSize
          pageData = data
          cb(err)
        })
    },
    function (cb) {
      roleModel.find({}, function (err, data) {
        allRoles = data
        cb(err)
      })
    }
  ], function (err, data) {
    if (err) return next(err)
    let pResults = []
    _.forEach(pageData.results, function (obj) {
      obj = obj.toObject()
      obj.rolesText = rolesToString(obj.roles, allRoles)
      pResults.push(obj)
    })
    pageData.results = pResults
    res.json({
      success: true,
      data: pageData
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
  models.DesignModel.find({pagePath: path}).populate('project').exec(function (err, data) {
    data = _.find(data, function (obj) {
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

function rolesToString (roles, all) {
  let str = ''
  for (let i = 0; i < roles.length; i++) {
    const role = _.find(all, function (o) {
      o = o.toObject()
      return o._id.toString() === roles[i]
    })
    if (role) {
      str = str + role.roleName + '|'
    }
  }
  return str.slice(0, str.length - 1)
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne,
  query
}

