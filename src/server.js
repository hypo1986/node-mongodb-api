/**
 * Created * 2017/7/20.
 */
'use strict'
const express = require('express')
const http = require('http')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const debug = require('debug')
const log4js = require('log4js')


const routes = require('./routes')
global._ = require('lodash')

const app = express()
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || global.config.api.port)
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(mongoSanitize({
  replaceWith: '_'
}))
app.use(cookieParser())

// log4js 日志输出
log4js.configure(require('./lib/log'))
app.use(log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.ERROR}))

routes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  res.json({
    success: false,
    data: null,
    error: {
      code: 404,
      message: err.message || 'Not Found'
    }
  })
})

// error handler
app.use(function (err, req, res, next) {
  res.json({
    success: false,
    error: {
      status: err.status || 500,
      message: err.message || 'Server Error'
    }
  })
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, global.config.api.host, function () {
  console.log('Server run at ==> http://' + global.config.api.host + ':' + port)
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
  } else if (error.code === 'EADDRINUSE') {
    console.error(bind + ' is already in use')
    process.exit(1)
  } else {
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
