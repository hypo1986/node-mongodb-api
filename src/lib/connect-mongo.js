/**
 * Created * 2017/3/20.
 */

const mongoose = require('mongoose')

const mongodb = global.config.zookeeper.mongodb

const mongodbUrl = 'mongodb://' + mongodb.user + ':' + mongodb.pwd + '@' + mongodb.hosts.join(',') + '/' + mongodb.db
// 分页插件
require('mongoose-pagination')
require('mongoose-schema-extend')

// const server = {
//   poolSize: 5,
//   socketOptions: {
//     keepAlive: 1,
//     connectTimeoutMS: 30000
//   }
// }
// const replset = {
//   rs_name: 'PCMS_RS',
//   auto_reconnect: true,
//   poolSize: 5,
//   socketOptions: {
//     keepAlive: 1,
//     connectTimeoutMS: 30000
//   }
// }
// const dbOptions = {
//   db: {native_parser: true},
//   replset: replset,
//   server: server
// };
mongoose.Promise = global.Promise
mongoose.connect(mongodbUrl, {
  server:{
    auto_reconnect: true,
    socketOptions:{
      connectTimeoutMS:3000000,
      keepAlive:120,
      socketTimeoutMS:3000000
    }
  },
  replset: {
    socketOptions: {
      keepAlive:3000000,
      socketTimeoutMS:3000000
    }
  }
})
// mongoose.connect(mongodbUrl, {auth: {authdb: mongodb.db}});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connect to mongoose success')
  console.log(mongodbUrl)
})

module.exports = mongoose
