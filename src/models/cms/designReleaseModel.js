const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const util = require('../../lib/util')
const collectionName = global.config.collection.cms_prefix + 'page_design_release'

const DesignPageRelease = pageBase.extend({
  publishAt: {type: Date, default: Date.now, get: util.formatDate}, // 发布时间
  pageId: {type: ObjectId},
  pageCode: {type: String, unique: true},
  jsLink: Schema.Types.Mixed,
  cssLink: Schema.Types.Mixed,
  templates: Schema.Types.Mixed
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('DesignPageRelease', DesignPageRelease)
