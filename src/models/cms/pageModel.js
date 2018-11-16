/**
 * Created by lvxin on 2017/4/1.
 */
const mongoose = require('../../lib/connect-mongo')
const pageBase = require('./pageBaseModel')
const util = require('../../lib/util')

const ENUM_STATUS = {
  dev: '开发中',
  online: '已上线',
  offline: '已下线'
}

const PageSchema = pageBase.extend({
  createdAt: {type: Date, default: Date.now, get: util.formatDate}, // 创建时间
  status: {type: String, default: 'dev'},
  updateAt: {type: Date, default: Date.now, get: util.formatDate}, // 更新时间
  // updateUser: String, // 由谁更新
  activityType: Array,
  businessType: Array,
  rewardsType: Array,
  roles: Array,
  pageCode: {type: String, unique: true}
}, {
  collection: 'pages',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

PageSchema.virtual('statusName').get(function () {
  return ENUM_STATUS[this.status]
})

module.exports = mongoose.model('PageSchema', PageSchema)
