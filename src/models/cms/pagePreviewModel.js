/**
 * Created by lvxin on 2017/4/1.
 */

const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const util = require('../../lib/util')

const PagePreview = pageBase.extend({
  publishAt: {type: Date, default: Date.now, get: util.formatDate}, // 发布时间
  pageId: {type: ObjectId},
  pageCode: {type: String, unique: true},
  jsLink: Schema.Types.Mixed, // *module合并后的js
  cssLink: Schema.Types.Mixed, // *module合并后的css
  templates: Schema.Types.Mixed// *本页面使用的module集合,module的originalModuleId读取,layout,floor等
}, {
  collection: 'pagepreview',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('PagePreview', PagePreview)
