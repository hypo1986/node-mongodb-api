const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const util = require('../../lib/util')
const collectionName = global.config.collection.cms_prefix + 'design_preview'

const PageDesignPreview = pageBase.extend({
  publishAt: {type: Date, default: Date.now, get: util.formatDate}, // 发布时间
  pageId: {type: ObjectId},
  jsLink: Schema.Types.Mixed, // *module合并后的js
  cssLink: Schema.Types.Mixed, // *module合并后的css
  templates: Schema.Types.Mixed// *本页面使用的module集合,module的originalModuleId读取,layout,floor等
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('PageDesignPreview', PageDesignPreview)
