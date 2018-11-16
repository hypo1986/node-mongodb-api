/**
 * Created by likaihua on 2017-5-12 17:08.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;

const RoleActionSchema = new Schema({
  roleId: {type: Schema.ObjectId, ref: 'RoleSchema'},
  actionId: {type: Schema.ObjectId, ref: 'ActionSchema'}
}, {
  collection: global.config.collection.permission_prefix + 'role_action',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('RoleActionSchema', RoleActionSchema);
