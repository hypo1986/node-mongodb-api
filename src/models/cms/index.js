/**
 * Created * 2017/5/12.
 */
const PageModel = require('./pageModel')
const PagePreviewModel = require('./pagePreviewModel')
const PageReleaseModel = require('./pageReleaseModel')
const ProjectModel = require('./projectModel')
const ModuleModel = require('./moduleModel')
const ImageTextModel = require('./imageTextModel')
const ImageTextCategoryModel = require('./imageTextCategoryModel')
const DynamicAPICategoryModel = require('./dynamicAPICategoryModel')
const DynamicAPIModel = require('./dynamicAPIModel')
const commonModel = require('./commonModel')
const PageBackupsModel = require('./pageBackupsModel')

const DesignModel = require('./designPageModel')
const DesignPreviewModel = require('./designPreviewModel')
const DesignReleaseModel = require('./designReleaseModel')
const DesignBackupModel = require('./designBackupModel')

module.exports = {
  PageModel,
  PagePreviewModel,
  PageReleaseModel,
  PageBackupsModel,
  ProjectModel,
  ModuleModel,
  ImageTextModel,
  ImageTextCategoryModel,
  DynamicAPICategoryModel,
  DynamicAPIModel,
  commonModel,
  DesignModel,
  DesignPreviewModel,
  DesignReleaseModel,
  DesignBackupModel
}
