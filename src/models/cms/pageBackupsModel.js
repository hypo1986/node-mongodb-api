/**
 * Created * 2017/7/3.
 */
const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const util = require('../../lib/util')
const collectionName = global.config.collection.cms_prefix + 'page_backups'

const PageBackupsSchema = pageBase.extend({
  publishAt: {type: Date, default: Date.now, get: util.formatDate}, // 发布时间
  pageId: {type: ObjectId},
  jsLink: Schema.Types.Mixed,
  cssLink: Schema.Types.Mixed,
  pageCode: String,
  templates: Schema.Types.Mixed,
  isRecover: Boolean // 是否可恢复
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('PageBackupsSchema', PageBackupsSchema)
