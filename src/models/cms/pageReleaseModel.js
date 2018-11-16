/**
 * Created by lvxin on 2017/4/1.
 */
/**
 * Created by lvxin on 2017/4/1.
 */
const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const util = require('../../lib/util')

const PageRelease = pageBase.extend({
  publishAt: {type: Date, default: Date.now, get: util.formatDate}, // 发布时间
  pageId: {type: ObjectId},
  pageCode: {type: String, unique: true},
  jsLink: Schema.Types.Mixed,
  cssLink: Schema.Types.Mixed,
  templates: Schema.Types.Mixed
}, {
  collection: 'pagerelease',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('PageRelease', PageRelease)
