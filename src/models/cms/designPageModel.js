const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
require('mongoose-schema-extend')
const util = require('../../lib/util')
const collectionName = global.config.collection.cms_prefix + 'design_page'

const ENUM_STATUS = {
  dev: '开发中',
  online: '已上线',
  offline: '已下线'
}

const PageDesignSchema = pageBase.extend({
  createdAt: {type: Date, default: Date.now, get: util.formatDate},
  status: {type: String, default: 'dev'}, // 设计状态：开发，已上线，已下线
  activityType: Array,
  businessType: Array,
  rewardsType: Array,
  roles: Array
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

PageDesignSchema.virtual('statusName').get(function () {
  return ENUM_STATUS[this.status]
})

module.exports = mongoose.model('PageDesignSchema', PageDesignSchema)
