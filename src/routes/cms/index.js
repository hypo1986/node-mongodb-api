/**
 * Created * 2017/5/12.
 */
const express = require('express')
const router = express.Router()
const project = require('./project')
const page = require('./page')
const pagepreview = require('./pagepreview')
const pagerelease = require('./pagerelease')
const pageBackups = require('./pageBackups')
const imageText = require('./imageText')
const modules = require('./modules')
const imageTextCategory = require('./imageTextCategory')
const dynamicAPICategory = require('./dynamicAPICategory')
const dynamicAPI = require('./dynamicAPI')
const common = require('./common')
const file = require('./file')

const designPage = require('./designPage')
const designPreview = require('./designPreview')
const designRelease = require('./designRelease')

router.use('/project', project)
router.use('/page', page)
router.use('/pagepreview', pagepreview)
router.use('/pagerelease', pagerelease)
router.use('/pagebackups', pageBackups)
router.use('/module', modules)

router.use('/imagetext', imageText)
router.use('/imagetextCategory', imageTextCategory)

router.use('/dynamicategory', dynamicAPICategory)
router.use('/dynamic', dynamicAPI)

router.use('/common', common)
router.use('/file', file)

router.use('/designpage', designPage)
router.use('/designpreview', designPreview)
router.use('/designrelease', designRelease)
module.exports = router
