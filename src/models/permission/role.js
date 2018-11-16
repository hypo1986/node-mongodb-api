/**
 * Created by likaihua on 2017/5/12.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;
const util = require('../../lib/util');

const RoleSchema = new Schema({
  roleName: String,
  roleDesc: String,
  lastEditUser: String,
  lastEditTime: {type: Date, default: Date.now, get: util.formatDate}
}, {
  collection: global.config.collection.permission_prefix + 'role',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('RoleSchema', RoleSchema);
