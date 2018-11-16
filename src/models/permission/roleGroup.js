/**
 * Created by likaihua on 2017-5-23 17:44.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;

const RoleGroupSchema = new Schema({
  roleId: {type: Schema.ObjectId, ref: 'RoleSchema'},
  groupId: {type: Schema.ObjectId, ref: 'GroupSchema'}
}, {
  collection: global.config.collection.permission_prefix + 'role_group',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('RoleGroupSchema', RoleGroupSchema);
