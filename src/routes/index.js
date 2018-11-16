/**
 * Created * 2017/3/20.
 */
/**
 * Created * 2017/3/20.
 * API总调度
 */
// const projects = require('./projects');
// const modules = require('./module');
// const page = require('./page');
// const pageRelease = require('./pagerelease');
// const pagePreview = require('./pagepreview');
// const user = require('./user');

const cmsRoutes = require('./cms/index')
const permissionRoutes = require('./permission')
const oauth = require('../lib/oauth')

const API_PREFIX = global.config.API_PREFIX

module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')

    if (!API_PREFIX) {
      return res.json({
        success: false,
        error: {
          message: 'API 前缀没用配置，请在项目config下配置各环境下的API_PREFIX'
        }
      })
    }
    next()
  })

  app.get('/', function (req, res, next) {
    res.json({
      success: true,
      data: 'Welcome to tttt PC CMS API',
      error: null
    })
  })
  app.use(API_PREFIX, oauth, cmsRoutes)
  app.use(API_PREFIX, oauth, permissionRoutes)
}
