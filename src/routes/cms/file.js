/**
 * Created by likaihua on 2017-6-23 13:28.
 */
const express = require('express')
const rp = require('request-promise')
const multipart = require('connect-multiparty')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const uploadDir = path.join(__dirname, '..', '..', '..', 'uploadFiles')

const ueConfig = {
  /* 上传图片配置项 */
  "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
  "imageFieldName": "file", /* 提交的图片表单名称 */
  "imageMaxSize": 2048000, /* 上传大小限制，单位B */
  "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
  "imageCompressEnable": false, /* 是否压缩图片,默认是true */
  "imageInsertAlign": "none", /* 插入的图片浮动方式 */
  "imageUrlPrefix": "", /* 图片访问路径前缀 */

  /* 涂鸦图片上传配置项 */
  "scrawlActionName": "uploadscrawl", /* 执行上传涂鸦的action名称 */
  "scrawlFieldName": "file", /* 提交的图片表单名称 */
  "scrawlMaxSize": 2048000, /* 上传大小限制，单位B */
  "scrawlUrlPrefix": "", /* 图片访问路径前缀 */
  "scrawlInsertAlign": "none",

  /* 截图工具上传 */
  "snapscreenActionName": "uploadimage", /* 执行上传截图的action名称 */
  "snapscreenUrlPrefix": "", /* 图片访问路径前缀 */
  "snapscreenInsertAlign": "none", /* 插入的图片浮动方式 */

  /* 上传视频配置 */
  "videoActionName": "uploadvideo", /* 执行上传视频的action名称 */
  "videoFieldName": "file", /* 提交的视频表单名称 */
  "videoUrlPrefix": "", /* 视频访问路径前缀 */
  "videoMaxSize": 102400000, /* 上传大小限制，单位B，默认100MB */
  "videoAllowFiles": [
    ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
    ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */

  /* 上传文件配置 */
  "fileActionName": "uploadfile", /* controller里,执行上传视频的action名称 */
  "fileFieldName": "file", /* 提交的文件表单名称 */
  "fileUrlPrefix": "", /* 文件访问路径前缀 */
  "fileMaxSize": 51200000, /* 上传大小限制，单位B，默认50MB */
  "fileAllowFiles": [
    ".png", ".jpg", ".jpeg", ".gif", ".bmp",
    ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
    ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
    ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
    ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
  ], /* 上传文件格式显示 */
}

router.post('/upload', multipart({
  uploadDir: uploadDir
}), function (req, res, next) {
  const {file} = req.files
  rp({
    method: 'POST',
    uri: config.uploadServerUrl + '/file/upload',
    json: true,
    formData: {
      files: fs.createReadStream(file.path)
    }
  }).then(function (o) {
    if (o && o.data && o.data.fileUrl) {
      res.json({
        data: config.imgUrl + '/' + o.data.fileUrl,
        success: true
      })
      return;
    }
    res.json({
      error: {
        message: '上传失败'
      },
      success: false
    })
  }).catch(function (err) {
    res.send(err)
  }).finally(function () {
    deleteUploadFile(file.path) //删除文件
  })
})

router.use('/ueditor', function (req, res, next) {

  var actionType = req.query.action

  switch (actionType) {
    case 'uploadimage':
    case 'uploadfile':
    case 'uploadvideo':
      next()
      break
    case 'listimage':
      res.jsonp({
        state: 'SUCCESS',
        list: [],
        start: 0,
        total: 0
      });
      break
    default:
      res.jsonp(ueConfig)
  }
}, multipart({
  uploadDir: uploadDir
}), function (req, res, next) {
  const {file} = req.files
  rp({
    method: 'POST',
    uri: config.uploadServerUrl + '/file/upload',
    json: true,
    formData: {
      files: fs.createReadStream(file.path)
    }
  }).then(function (o) {
    if (o && o.data && o.data.fileUrl) {
      res.json({
        state: 'SUCCESS',
        url: config.imgUrl + '/' + o.data.fileUrl,
        title: file.name,
        original: file.originalFilename,
        type: file.type,
        size: file.size
      })
    }
  }).catch(function (err) {
    res.send(err)
  }).finally(function () {
    deleteUploadFile(file.path) //删除文件
  })
})


function createUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }
}

function deleteUploadFile(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
}

createUploadDir()

module.exports = router
