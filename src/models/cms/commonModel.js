/**
 * Created by likaihua on 2017/3/20.
 * 模块
 */
const mongoose = require('../../lib/connect-mongo')
const Schema = mongoose.Schema
const collectionName = global.config.collection.cms_prefix + 'common'

const CommonModulesSchema = new Schema({
  name: String,
  less: String,
  js: String,
  lib: Schema.Types.Mixed,
  images: Schema.Types.Mixed,
  modules: Schema.Types.Mixed,
  structure: Schema.Types.Mixed
}, {
  collection: collectionName,
  versionKey: false,
  id: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
})

module.exports = mongoose.model('CommonModulesSchema', CommonModulesSchema)
