/**
 * Created * 2017/3/20.
 */
'use strict'

const zookeeper = require('node-zookeeper-client')
const async = require('async')
let env = process.env.NODE_ENV || 'development'
env = env === 'development' ? 'local' : env
let config = require('../../config/' + env) || {}

module.exports.initConfig = function (callback) {
  let zkConfig = config.zookeeper
  let zkUrls = zkConfig.hosts.join(',')
  // console.log(zkUrls)
  let client = zookeeper.createClient(zkUrls, {
    sessionTimeout: 100,
    spinDelay: 1000,
    retries: 1
  })

  client.once('connected', function () {
    console.log('Connected to the server.')
  })
  client.on('disconnected', function (state) {
    if (state === zookeeper.State.SYNC_CONNECTED) {
      console.log('Client state is changed to connected.')
    }
  })
  client.connect()
  // let state = client.getState()
  // console.log('Current state is: %s', state)
  let keys = []

  let _path = zkConfig.mongodb.path
  for (let key in zkConfig.mongodb) {
    if (key !== 'path') {
      keys.push({
        name: key,
        key: _path + zkConfig.mongodb[key]
      })
    }
  }
  function getData (obj, callback) {
    client.getData(obj.key, function (err, value) {
      if (err) {
        return callback(err, null)
      }
      if (obj.name === 'hosts') {
        zkConfig.mongodb[obj.name] = [value.toString()]
      } else {
        zkConfig.mongodb[obj.name] = value.toString()
      }
      callback(null, value.toString())
      // console.info(error, 'value:', value.toString())
    })

    // client.getData(obj.key, function (event) {
    //   console.log('Got event: %s.', event)
    // }, function (error, data, stat) {
    //   if (error) {
    //     console.log(error.stack)
    //     return callback(error, null)
    //     // return
    //   }
    //   if (obj.name === 'hosts') {
    //     zkConfig.mongodb[obj.name] = [data.toString()]
    //   } else {
    //     zkConfig.mongodb[obj.name] = data.toString()
    //   }
    //   callback(null, data.toString())
    //   console.log('Got data: %s', data.toString('utf8'))
    // })
  }

  async.mapLimit(keys, 4, getData, function (err, results) {
    if (err) {
      console.log(err)
      // 防止报错备用，后将废弃
      config.zookeeper.mongodb = config.mongodb
    } else {
      console.log('zookeeper configuration success')
    }
    global.config = config
    callback && callback()
  })
}
