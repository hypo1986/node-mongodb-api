/**
 * Created by likaihua on 2017-5-22 9:33.
 */
'use strict'

const models = require('../../models/permission')
const _ = require('lodash')
const async = require('async')
const defaultAction = [
  {
    actionName: '新增',
    actionCode: 'create'
  },
  {
    actionName: '删除',
    actionCode: 'delete'
  },
  {
    actionName: '更新',
    actionCode: 'update'
  },
  {
    actionName: '查询',
    actionCode: 'query'
  }
]

function addGroup (req, res, next) {
  const db = new models.Group(req.body)
  db.save(function (err, data) {
    if (err) return next(err)
    const groupId = data._id
    let actions = []
    for (let i = 0; i < defaultAction.length; i++) {
      actions.push(_.assign({
        actionGroup: groupId
      }, defaultAction[i]))
    }
    //添加默认功能
    models.Action.insertMany(actions, function (err2, data2) {
      if (err2) return next(err2)
      res.json({
        success: true,
        data: data
      })
    })
  })
}

function deleteGroup (req, res, next) {

  const groupId = req.params.groupId // 分组ID
  models.Action.find({actionGroup: groupId}, function (err, dataActions) {
    if (err) return next(err)
    const actionIds = _.map(dataActions, '_id')

    async.parallel([
      function (cb) {
        models.Group.remove({_id: groupId}, function (err) {
          cb(err)
        })
      },
      function (cb) {
        models.Action.remove({actionGroup: groupId}, function (err) {
          cb(err)
        })
      },
      function (cb) {
        models.RoleAction.remove({actionId: {$in: actionIds}}, function (err) {
          cb(err)
        })
      },
      function (cb) {
        models.RoleGroup.remove({groupId: groupId}, function (err) {
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
      } else {
        return res.json({
          success: true,
          data: '删除成功'
        })
      }
    })
  })
}

function updateGroup (req, res, next) {
  const groupId = req.params.groupId // 分组ID
  models.Group.update({_id: groupId}, req.body, {
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

function getGroups (req, res, next) {

  models.Group.find({}, function (err, groups) {
    if (err) return next(err)
    let taskList = []
    groups.forEach(function (obj) {
      taskList.push(function (cb) {
        models.Action.find({actionGroup: obj._id}, function (err, data) {
          let re = obj.toObject()
          re.actions = data
          cb(err, re)
        })
      })
    })
    async.parallel(taskList, function (err, results) {
      if (err) return next(err)
      res.json({
        success: true,
        data: results
      })
    })
  })
}

function addAction (req, res, next) {
  const db = new models.Action(req.body)
  db.save(function (err, data) {
    if (err) return next(err)
    res.json({
      success: true,
      data: data
    })
  })
}

function deleteAction (req, res, next) {
  const actionId = req.params.actionId // actionId
  async.parallel([
    function (cb) {
      models.RoleAction.remove({actionId: actionId}, function (err) {
        cb(err)
      })
    },
    function (cb) {
      models.Action.remove({_id: actionId}, function (err) {
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
    } else {
      return res.json({
        success: true,
        data: '删除成功'
      })
    }
  })
}

function updateAction (req, res, next) {
  const actionId = req.params.actionId
  models.Action.update({_id: actionId}, req.body, {
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

module.exports = {
  getGroups,
  addGroup,
  deleteGroup,
  updateGroup,
  addAction,
  deleteAction,
  updateAction
}
