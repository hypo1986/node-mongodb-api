/**
 * Created * 2017/11/24.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collectionName = global.config.collection.cms_prefix + 'dynamic_api'
const util = require('../../lib/util')

const DynamicAPISchema = new Schema({
  fields: Object, // 动态字段集合
  key: {type: String, index: 1, required: true, unique: true}, // 区分用途唯一
  user: String, // 创建人
  status: String, // 状态: online,preview
  online: {type: Boolean, default: false, index: 1}, // 选中上线
  preview: {type: Boolean, default: false}, // 选中预览，上线前预览使用
  sort: Number, // 排序，权重
  timer: {type: Boolean, default: false, index: 1}, // 定时器其中
  startTime: {type: Date, default: Date.now, get: util.formatDate, index: 1}, // 开始时间 定时发布使用
  endTime: {type: Date, default: Date.now, get: util.formatDate, index: 1},   // 结束时间 定时发布使用
  expend: Schema.Types.Mixed, // 扩展节点
  updateAt: {type: Date, default: Date.now, get: util.formatDate},
  createAt: {type: Date, default: Date.now, get: util.formatDate}
}, {
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true},
  collection: collectionName
})

module.exports = mongoose.model('DynamicAPISchema', DynamicAPISchema)
