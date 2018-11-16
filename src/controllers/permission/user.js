/**
 * Created by likaihua on 2017-5-12 17:38.
 */
'use strict'

const models = require('../../models/permission')
const _ = require('lodash')
const rp = require('request-promise')
const dbhelper = require('../../lib/dbHelper')
const {uid} = global.config.ldap

function getUserInfo (req, res, next) {
  rp({
    method: 'GET',
    uri: global.config.mcmshost + '/api/user/getInfo',
    headers: {
      cookie: req.headers.cookie
    }
  }).then(function (o) {
    if (typeof o === 'string') {
      o = JSON.parse(o)
    }
    if (o.success) {
      let data = o.data
      delete data.menuList
      delete data.permissionList
      delete data.roleList
      dbhelper.getUserPermission(data[uid]).then(function (permission) {
        data.permission = permission.permission
        data.roles = permission.roleIds
        res.json({
          success: true,
          data: data
        })
      }).catch(function (err) {
        res.json({
          success: true,
          data: data
        })
      })
    } else {
      res.send(o)
    }
  }).catch(function (err) {
    res.send(err)
  })
}

function getUserList (req, res, next) {
  dbhelper.userQuery('(' + uid + '=*)').then(function (data) {
    let re = _.groupBy(data, function (n) {
      return n.department
    })
    delete re.undefined
    res.json({
      success: true,
      data: re
    })
  }).catch(function (err) {
    console.log(err)
    res.json(
      {
        success: false,
        error: {
          code: '501',
          message: '服务器异常'
        }
      }
    )
  })
}

function getUserById (req, res, next) {
  const userId = req.query.userId
  dbhelper.userQuery('(' + uid + '=' + userId + ')').then(function (data) {
    if (data && data.length > 0) {
      let result = data[0]
      models.UserRole.find({userId: userId}, function (err, data) {
        if (err) return next(err)
        if (data && data.length > 0) {
          let roles = []
          for (let i = 0; i < data.length; i++) {
            roles.push(data[i].roleId)
          }
          result.roles = roles
        } else {
          result.roles = []
        }
        res.json({
          success: true,
          data: result
        })
      })
    } else {
      res.json(
        {
          success: false,
          error: {
            message: '未查询到用户'
          }
        }
      )
    }
  }).catch(function (err) {
    res.json(
      {
        success: false,
        error: {
          code: '501',
          message: '服务器异常'
        }
      }
    )
  })
}

function assignRole (req, res, next) {
  const userId = req.body.userId
  const roleIds = req.body.roleIds || []
  let userRole = []
  for (let i = 0; i < roleIds.length; i++) {
    userRole.push({
      userId: userId,
      roleId: roleIds[i]
    })
  }
  models.UserRole.remove({userId: userId}, function (err, data) {
    if (err) return next(err)
    models.UserRole.insertMany(userRole, function (err2, data2) {
      if (err2) return next(err2)
      res.json({
        success: true,
        data: data2
      })
    })
  })
}

function queryUser (req, res, next) {
  const keyword = req.query.keyword
  dbhelper.userQuery('|(' + uid + '=*' + keyword + '*)(displayName=*' + keyword + '*)').then(function (data) {
    if (data && data.length > 0) {
      res.json({
        success: true,
        data: data
      })
    } else {
      res.json({
        success: true,
        data: []
      })
    }
  }).catch(function (err) {
    res.json(
      {
        success: false,
        error: {
          code: '501',
          message: '服务器异常'
        }
      }
    )
  })
}

module.exports = {
  getUserInfo,
  getUserList,
  assignRole,
  getUserById,
  queryUser
}
