/**
 * Created by likaihua on 2017/3/20.
 * 项目
 */
const mongoose = require('../../lib/connect-mongo');
const Schema = mongoose.Schema;
const util = require('../../lib/util');

const ProjectSchema = new Schema({
  projectName: String, // 项目名称
  englishName: String, // 项目英文名称
  desc: String, // 项目描述
  link: String, // 链接
  icon: String, // 图标
  layout: String,//头底
  createdAt: {type: Date, default: Date.now, get: util.formatDate}, // 创建时间
  user: String // 由谁创建
}, {
  collection: 'projects',
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

module.exports = mongoose.model('ProjectSchema', ProjectSchema);
