/**
 * Created * 2017/11/24.
 */
const mongoose = require('../../lib/connect-mongo')
const util = require('../../lib/util')
const Schema = mongoose.Schema
const collectionName = global.config.collection.cms_prefix + 'dynamic_api_category'

const DynamicAPIFieldsSchema = new Schema({
  label: String,
  keyName: String,
  placeholder: String,
  value: {type: Schema.Types.Mixed, default: null},
  type: {type: String, default: 'text'},
  lock: Boolean,
  expend: Schema.Types.Mixed,
  user: String, // 创建人
  updateAt: {type: Date, default: Date.now, get: util.formatDate},
  createAt: {type: Date, default: Date.now, get: util.formatDate}
})

const DynamicAPICategorySchema = new Schema({
  parent: {type: Schema.ObjectId, index: 1},
  key: String,
  type: String,
  englishTitle: String,
  dataMode: String,
  fields: [DynamicAPIFieldsSchema],
  title: String,
  desc: String,
  user: String, // 创建人
  updateAt: {type: Date, default: Date.now, get: util.formatDate},
  createAt: {type: Date, default: Date.now, get: util.formatDate}
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports.DynamicAPICategory = mongoose.model('DynamicAPICategorySchema', DynamicAPICategorySchema)
module.exports.DynamicAPIField = mongoose.model('DynamicAPIFieldsSchema', DynamicAPIFieldsSchema)
