/**
 * Created by likaihua on 2017-4-1.
 * 数据库查询通用方法库
 */
'use strict'

const async = require('async')
const ldap = require('ldapjs')
const _ = require('lodash')
// const {ldapUrl, bindDn, password, base} = global.config.ldap
const ldapConfig = global.config.ldap
const attributes = ['dn', 'displayName', 'name', 'sn', 'givenName', 'title', 'mail', 'mailNickname', 'telephoneNumber', 'mobile', 'department']
/**
 * 分页查询
 * @param page 页码
 * @param pageSize 每页的大小
 * @param Model 数据Model名称
 * @param populate
 * @param queryParams 查询参数
 * @param sortParams 排序参数
 * @param callback
 */
const pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
  const start = (page - 1) * pageSize
  const data = {
    page: page,
    pageSize: pageSize
  }
  async.parallel({
    count: function (done) {  // 查询数量
      Model.count(queryParams).exec(function (err, count) {
        done(err, count)
      })
    },
    records: function (done) {   // 查询一页的记录
      Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
        done(err, doc)
      })
    }
  }, function (err, results) {
    const count = results.count
    data.totalSize = count
    // data.pageCount = (count - 1) / pageSize + 1;
    data.results = results.records
    callback(err, data)
  })
}
/**
 * 用户查询方法
 * @param filter
 * @returns {*}
 */
const userQuery = function (filter) {
  return new Promise(function (resolve, reject) {
    const client = ldap.createClient({
      url: ldapConfig.ldapUrl,
      timeout: 120000
    })
    let result = []
    client.bind(ldapConfig.bindDn, ldapConfig.password, function (err) {
      if (err) {
        reject(err)
      }
      client.search(ldapConfig.base, {
        filter: filter,
        scope: 'sub',
        attributes: attributes
      }, function (err, res2) {
        if (err) {
          reject(err)
        }
        res2.on('searchEntry', function (entry) {
          result.push(entry.object)
        })
        res2.on('error', function (err) {
          // reject(err)
          // TODO: ldapjs bug
          resolve(result)
        })
        res2.on('end', function () {
          client.unbind()
          resolve(result)
        })
      })
    })
  })
}

const getUserPermission = function (userId) {
  const models = require('../models/permission')
  return new Promise(function (resolve, reject) {
    models.UserRole.find({userId: userId}, function (err, data) {
      if (err) return reject(err)

      const roleIds = _.map(data, 'roleId')

      let roleGroup = []
      let roleAction = []

      async.parallel([
        function (cb) {
          models.RoleGroup.find({roleId: {$in: roleIds}}).populate('groupId').exec(function (err, dataRoleGroup) {
            roleGroup = _.uniq(_.map(dataRoleGroup, 'groupId'), '_id') // 获取用户功能分组并去重
            cb(err)
          })
        },
        function (cb) {
          models.RoleAction.find({roleId: {$in: roleIds}}).populate('actionId').exec(function (err, dataRoleAction) {
            roleAction = _.uniq(_.map(dataRoleAction, 'actionId'), '_id')
            cb(err)
          })
        }
      ], function (err, data) {
        if (err) return reject(err)
        let re = {}
        for (let i = 0; i < roleGroup.length; i++) {
          const item = roleGroup[i].toObject() // 分组对象
          const actions = _.filter(roleAction, function (obj) {
            const ra = obj.toObject()
            return ra.actionGroup.toString() === item._id.toString()
          })
          re[item.groupCode] = _.map(actions, 'actionCode')
        }
        resolve({
          roleIds: roleIds,
          permission: re
        })
      })
    })
  })
}

module.exports = {
  pageQuery: pageQuery,
  userQuery: userQuery,
  getUserPermission: getUserPermission
}
