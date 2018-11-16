/**
 * Created * 2017/5/12.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = global.config.collection.cms_prefix + 'operatelog';

const OperateLogSchema = new Schema({
  category: String,
  type: String,
  desc: String,
  user: String,
  createAt: {type: Date, default: Date.now}
}, {
  versionKey: false,
  collection: collectionName
});

module.exports = mongoose.model('OperateLogSchema', OperateLogSchema);
