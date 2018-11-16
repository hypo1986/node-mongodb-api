/**
 * Created * 2017/5/12.
 */
const project = require('./project')
const page = require('./page')
const pagePreview = require('./pagePreview')
const pageRelease = require('./pageRelease')
const pageBackups = require('./pageBackups')
const modules = require('./modules')
const imageText = require('./imageText')
const imageTextCategory = require('./imageTextCategory')
const dynamicAPICategory = require('./dynamicAPICategory')
const dynamicAPI = require('./dynamicAPI')
const common = require('./common')

const designPage = require('./designPage')
const designPreview = require('./designPreview')
const designRelease = require('./designRelease')

module.exports = {
  project,
  page,
  pagePreview,
  pageRelease,
  pageBackups,
  modules,
  imageText,
  imageTextCategory,
  dynamicAPICategory,
  dynamicAPI,
  common,
  designPage,
  designPreview,
  designRelease
}
