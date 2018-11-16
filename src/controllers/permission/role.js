/**
 * Created by likaihua on 2017-5-16 9:48.
 */

const models = require('../../models/permission');
const dbHelper = require('../../lib/dbHelper');
const async = require('async');
const _ = require('lodash');
const {uid} = global.config.ldap;

function addRole(req, res, next) {
  const db = new models.Role(_.assign(req.body, {lastEditTime: new Date()}));
  db.save(function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}
function deleteRole(req, res, next) {
  const id = req.params.id;
  async.parallel([
    function (cb) {
      models.UserRole.remove({roleId: id}, function (err) {
        cb(err);
      });
    },
    function (cb) {
      models.RoleAction.remove({roleId: id}, function (err) {
        cb(err);
      });
    },
    function (cb) {
      models.RoleGroup.remove({roleId: id}, function (err) {
        cb(err);
      });
    },
    function (cb) {
      models.Role.remove({_id: id}, function (err) {
        cb(err);
      });
    }
  ], function (err, results) {
    if (err) {
      return res.json({
        success: false,
        error: {
          message: '删除失败'
        }
      });
    } else {
      res.json({
        success: true,
        data: '删除成功'
      });
    }
  });
}

function updateRole(req, res, next) {
  const id = req.params.id;
  models.Role.update({_id: id}, _.assign(req.body, {lastEditTime: new Date()}), {
    upsert: true,
    safe: true
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function getRoleList(req, res, next) {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || null;
  const queryParams = req.query;
  delete queryParams.page;
  delete queryParams.pageSize;

  dbHelper.pageQuery(+page, +pageSize, models.Role, '', queryParams, {
    lastEditTime: 'desc'
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}
/**
 * 获取角色关联的用户
 * @param req
 * @param res
 * @param next
 */
function getUsers(req, res, next) {
  const roleId = req.query.roleId;

  models.UserRole.find({roleId: roleId}, function (err, data) {
    if (err) return next(err);
    let users = [];
    if (data && data.length > 0) {
      let filter = '(|';
      for (let i = 0; i < data.length; i++) {
        const userId = data[i].userId;
        filter += '(' + uid + '=' + userId + ')';
      }
      filter += ')';
      dbHelper.userQuery(filter).then(function (data2) {
        users = data2;
        res.json({
          success: true,
          data: users
        });
      }).catch(function (err2) {
        res.json(
          {
            success: false,
            error: {
              code: '501',
              message: '服务器异常'
            }
          }
        )
      });
    } else {
      res.json({
        success: true,
        data: []
      });
    }
  });

}

function assignRole(req, res, next) {
  const roleId = req.body.roleId;
  const userIds = req.body.userIds || [];
  let userRole = [];
  for (let i = 0; i < userIds.length; i++) {
    userRole.push({
      roleId: roleId,
      userId: userIds[i]
    })
  }
  models.UserRole.remove({roleId: roleId}, function (err, data) {
    if (err) return next(err);
    models.UserRole.insertMany(userRole, function (err2, data2) {
      if (err2) return next(err2);
      res.json({
        success: true,
        data: data2
      });
    });
  });
}

module.exports = {
  addRole,
  deleteRole,
  updateRole,
  getRoleList,
  getUsers,
  assignRole
};
