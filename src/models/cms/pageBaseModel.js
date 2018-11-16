/**
 * Created by lvxin on 2017/4/1.
 */
/**
 * Created by lvxin on 2017/4/1.
 */
const mongoose = require('../../lib/connect-mongo')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

module.exports = new Schema({
  pageName: String,
  pagePath: String,
  user: String, // 创建人
  type: String, // 页面设计类型：混合活动页，嵌入设计页面，纯vue设计页面
  layout: String, // 头底
  project: {type: ObjectId, ref: 'ProjectSchema'},
  components: Schema.Types.Mixed, // 存放布局内容
  updateUser: String, // 由谁更新
  head: {
    title: String,
    description: String,
    keywords: String,
    mata: Schema.Types.Mixed
  }
})
