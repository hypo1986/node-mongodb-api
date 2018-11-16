/**
 * Created by likaihua on 2017/3/20.
 * 模块
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;
const util = require('../../lib/util');

const ModulesSchema = new Schema({
  name: String,
  template: String,
  js: String,
  css: String,
  mode: String,
  thumbnail: String,
  defaultProps: Schema.Types.Mixed, // 默认属性集合
  settings: Schema.Types.Mixed,
  apis: Schema.Types.Mixed,
  category: String,
  type: String,
  demoData: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now, get: util.formatDate}, // 创建时间
  user: String, // 由谁创建
  updateAt: {type: Date, default: Date.now, get: util.formatDate}, // 更新时间
  updateUser: String, // 由谁更新
  status: {type: Number, default: 0} // 模块状态0禁用状态 1启用状态
}, {
  collection: 'modules',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('ModulesSchema', ModulesSchema);
