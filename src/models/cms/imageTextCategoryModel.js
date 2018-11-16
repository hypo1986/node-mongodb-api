/**
 * Created * 2017/5/26.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collectionName = global.config.collection.cms_prefix + 'imagetext_category'
const util = require('../../lib/util')

const ImageTextCategory = new Schema({
  key: {type: String, index: 1, required: true, unique: true}, // 区分用途唯一
  name: String, // 名称
  desc: String,
  category: {type: String, index: 1}, // 大类
  type: String, // 小类
  modalType: String, // 弹窗标志
  user: String, // 创建人
  updateAt: {type: Date, default: Date.now, get: util.formatDate},
  createAt: {type: Date, default: Date.now, get: util.formatDate}
}, {
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true},
  collection: collectionName
})

module.exports = mongoose.model('ImageTextCategory', ImageTextCategory)
