/**
 * Created by likaihua on 2017-5-12 16:54.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  userId: String,
  roleId: {type: Schema.ObjectId, ref: 'RoleSchema'}
}, {
  collection: global.config.collection.permission_prefix + 'user_role',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('UserRoleSchema', UserRoleSchema);
