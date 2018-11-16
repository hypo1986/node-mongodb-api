/**
 * Created * 2017/5/12.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collectionName = global.config.collection.cms_prefix + 'imagetext'
const util = require('../../lib/util')
/**
 * 一下列出常用字段
 * expend 扩展字段
 */
const ImageTextSchema = new Schema({
  key: {type: String, index: 1}, // 区分用途唯一
  name: String, // 模块名称
  category: {type: String, index: 1}, // 大类
  type: String, // 小类
  user: String, // 创建人
  title: String, // 有标题时使用
  subTitle: String,     // index使用
  subTitleLink: String, // index使用
  imageUrl: String,     // 图片地址
  imageLink: String,    // 图片链接
  buttonLink: String,   // index使用
  buttonText: String,   // index使用
  smallImageUrl: String,
  link: String, // 跳转链接
  text: String, // 文本
  smallText: String, // 小文本
  desc: String, // 描述
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

// ImageTextSchema.path('endTime', {
//   set: function (endTime) {
//     if (endTime) return endTime;
//     else return util.getDateTime(endTime, 10);
//   },
//   get: function (endTime) {
//     return util.formatDate(endTime);
//   }
// });

module.exports = mongoose.model('ImageTextSchema', ImageTextSchema)
