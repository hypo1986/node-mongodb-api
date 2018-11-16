/**
 * Created by likaihua on 2017-5-12 17:00.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  groupName: String,
  groupCode: String,
  groupDesc: String
}, {
  collection: global.config.collection.permission_prefix + 'group',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('GroupSchema', GroupSchema);
