const setting = require('./src/lib/setting')

setting.initConfig(function () {
  require('./src/server')
})
