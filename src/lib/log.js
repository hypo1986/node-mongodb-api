var path = require('path');
var appName = path.basename(process.cwd()).replace(/-\d{8}T\d{4}/, '');//应用名
var logPath = '/export/log/' + appName + '/' + appName;
var env = process.env.NODE_ENV || 'development';
//console.log(env,'88888');
if (env === 'development') {
  logPath = process.cwd() + '/' + appName;
}else if(env === 'local'){
  logPath = './'+appName;
}
if (process.env.NODE_APP_INSTANCE) {
  logPath = logPath + '-' +  String.fromCharCode(97 + Number(process.env.NODE_APP_INSTANCE));
}

var layout = {
  type: 'pattern',
  pattern: '%d{ISO8601} [%p] [%c] %m'
};

var logConfig = {
  appenders: [
    {
      type: 'dateFile',
      filename: logPath + '.log',
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: false,
      level: 'ALL',
      layout: layout
    }
  ],
  replaceConsole: true
};
if (env === 'development') {
  logConfig.appenders = [{
    type: 'console',
    layout: layout
  }];
}

module.exports = logConfig;