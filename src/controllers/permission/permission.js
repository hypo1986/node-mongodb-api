/**
 * Created by likaihua on 2017-5-23 11:15.
 */
'use strict'

const models = require('../../models/permission')
const dbHelper = require('../../lib/dbHelper')
const async = require('async')
const _ = require('lodash')

function getRolePermission (req, res, next) {
  const roleId = req.query.roleId
  let groups = []
  let roleGroup = []
  let roleAction = []
  async.parallel([
    function (cb) {
      models.Group.find({}, function (err, dataGroups) {
        groups = dataGroups
        cb(err)
      })
    },
    function (cb) {
      models.RoleGroup.find({roleId: roleId}, function (err, dataRoleGroup) {
        roleGroup = _.map(dataRoleGroup, function (n) {
          return n.groupId.toString()
        })
        cb(err)
      })
    },
    function (cb) {
      models.RoleAction.find({roleId: roleId}).populate('actionId').exec(function (err, dataRoleAction) {
        roleAction = _.map(dataRoleAction, 'actionId')
        cb(err)
      })
    }
  ], function (err, data) {
    if (err) return next(err)
    let re = []
    for (let i = 0; i < groups.length; i++) {
      let item = groups[i].toObject()
      item.access = roleGroup.indexOf(item._id.toString()) > -1
      item.actions = _.filter(roleAction, function (obj) {
        const ra = obj.toObject()
        return ra.actionGroup.toString() === item._id.toString()
      })
      re.push(item)
    }
    res.json({
      success: true,
      data: re
    })
  })
}

function getUserPermission (req, res, next) {

  const userId = req.query.userId

  dbHelper.getUserPermission(userId).then(function (data) {
    res.json({
      success: true,
      data: data.permission
    })
  }).catch(function (err) {
    if (err) return next(err)
  })
}

function assignPermission (req, res, next) {
  const roleId = req.body.roleId
  const actionIds = req.body.actionIds || []
  const groupIds = req.body.groupIds || []
  let roleAction = []
  let roleGroup = []
  for (let i = 0; i < actionIds.length; i++) {
    roleAction.push({
      roleId: roleId,
      actionId: actionIds[i]
    })
  }
  for (let i = 0; i < groupIds.length; i++) {
    roleGroup.push({
      roleId: roleId,
      groupId: groupIds[i]
    })
  }

  async.parallel([
    function (cb) {
      models.RoleAction.remove({roleId: roleId}, function (err) {
        cb(err)
      })
    },
    function (cb) {
      models.RoleGroup.remove({roleId: roleId}, function (err) {
        cb(err)
      })
    }
  ], function (err, data) {
    if (err) return next(err)
    async.parallel([
      function (cb) {
        models.RoleAction.insertMany(roleAction, function (err) {
          cb(err)
        })
      },
      function (cb) {
        models.RoleGroup.insertMany(roleGroup, function (err) {
          cb(err)
        })
      }
    ], function (err2, data2) {
      if (err2) return next(err2)
      res.json({
        success: true,
        data: '保存成功'
      })
    })
  })
}

module.exports = {
  getRolePermission,
  getUserPermission,
  assignPermission
}
