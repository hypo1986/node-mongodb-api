/**
 * Created by likaihua on 2017-5-12 17:03.
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const collectionName = global.config.collection.permission_prefix + 'action';

const ActionSchema = new Schema({
  actionName: String,
  actionCode: String,
  actionType: String,
  actionGroup: {type: Schema.ObjectId, ref: 'GroupSchema'}
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('ActionSchema', ActionSchema);
