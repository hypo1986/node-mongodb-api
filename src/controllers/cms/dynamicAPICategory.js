/**
 * Created * 2017/11/24.
 */
const cms = require('../../models').cms
const DAPIC = cms.DynamicAPICategoryModel

function create (req, res, next) {
  let parent = req.body.parent
  // console.log(req.body)
  if (parent) {
    let key = req.body.key
    if (!key) {
      return res.json({
        success: false,
        message: 'lost key'
      })
    }
    // 1.查找parent id是否存在
    // 2.检查key是否存
    Promise.all([
      DAPIC.DynamicAPICategory.findOne({_id: parent}),
      DAPIC.DynamicAPICategory.findOne({key: key})
    ]).then(results => {
      let parent = results[0]
      let key = results[1]
      if (!parent) {
        return res.json({
          success: false,
          message: 'parent is not exist'
        })
      }
      if (key) {
        return res.json({
          success: false,
          message: 'key is exist'
        })
      }
      let cate = new DAPIC.DynamicAPICategory(req.body)
      cate.save().then(() => {
        res.json({
          success: true
        })
      }).catch(err => {
        console.log(err)
        res.json({
          success: false
        })
      })
    }).catch(err => {
      console.log(err)
      res.json({
        success: false
      })
    })
  } else {
    // create
    req.body.parent = null
    let cate = new DAPIC.DynamicAPICategory(req.body)
    cate.save((err) => {
      if (err) return next(err)
      res.json({
        success: true
      })
    })
  }
}

function updateOne (req, res, next) {
  let id = req.params.id
  req.body.updateAt = new Date()
  let updateType = req.body.updateType // fields

  if (!id) {
    return res.json({
      success: false,
      message: 'id is lost'
    })
  }
  if (!updateType) {
    return res.json({
      success: false,
      message: 'updateType field lost'
    })
  }

  DAPIC.DynamicAPICategory.findOne({_id: id}, (err, doc) => {
    if (err) return next(err)
    if (!doc) {
      return res.json({
        success: false,
        message: 'This content not found'
      })
    }

    if (updateType === 'category') {
      if (req.body.fields) {
        delete req.body.fields
      }
      // parent is objectId so,update must delete it
      for (let k in req.body) {
        if (k === 'parent') {
          delete req.body.parent
        }
      }
      let oldKey = doc.key
      let newKey = req.body.key
      // key
      Object.assign(doc, req.body)
      if (oldKey) {
        // update all data key
        cms.DynamicAPIModel.update({key: oldKey}, {key: newKey}, {
          multi: true, safe: true
        }, (err, u) => {
          console.log(err, u)
          if (err) return next(err)
          doc.save(err => {
            if (err) return next(err)
            res.json({
              success: true
            })
          })
        })
      } else {
        doc.save(err => {
          if (err) return next(err)
          res.json({
            success: true
          })
        })
      }
    } else {
      // updateType is fields 设置字段时
      let _fields = req.body.fields || []
      let fields = [] // doc.fields || []
      // _.forEach(fields, (item) => {
      //   let updateFields = _.find(_fields, (o) => {
      //     return o._id == item._id
      //   })
      //   let index = _.findIndex(_fields, ['_id', '' + item._id])
      //   if (index > -1) {
      //     // 删除
      //     _fields.splice(index, 1)
      //   }
      //   if (updateFields) {
      //     delete updateFields._id
      //   }
      //   Object.assign(item, updateFields, {updateAt: new Date()})
      //   return item
      // })
      _.forEach(_fields, (item, i) => {
        // 创建
        if (!item._id) {
          let field = new DAPIC.DynamicAPIField(item)
          fields.push(field)
        } else {
          fields.push(item)
        }
      })
      doc.fields = fields
      if (req.body.dataMode) {
        doc.dataMode = req.body.dataMode
      }
      doc.save(err => {
        if (err) return next(err)
        res.json({
          success: true,
          data: doc
        })
      })
    }
  })
}

function findOne (req, res, next) {
  let id = req.params.id
  DAPIC.DynamicAPICategory.findOne({_id: id}, function (err, doc) {
    if (err) return next(err)
    res.json({
      success: true,
      data: doc
    })
  })
}

function list (req, res, next) {
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 1000
  let parent = req.query.parent || null
  let cond = {} // parent: parent
  let filter = {}
  if (req.query.keywords) {
    const reg = new RegExp(req.query.keywords, 'i') // 不区分大小写
    cond.title = reg
  }

  if (!parent) {
    filter = {
      fields: 0
    }
  } else {
    cond.parent = parent
  }

  DAPIC.DynamicAPICategory.find(cond, filter).sort({createdAt: -1}).paginate(page, pageSize, (err, docs, total) => {
    if (err) return next(err)
    // 转换格式
    docs = docs.map(function (d) {
      return d.toObject()
    })
    let parents = null
    if (!parent) {
      // 得到所有一级菜单
      parents = _.filter(docs, (o) => {
        return !o.parent
      })
      // 处理二级菜单
      _.map(parents, (p) => {
        p.children = _.filter(docs, (o) => {
          return o.parent && o.parent.equals(p._id)
        })
        return p
      })
    } else {
      parents = docs
    }
    res.json({
      success: true,
      data: {
        results: parents,
        page: page,
        pageSize: pageSize,
        totalSize: total
      }
    })
  })
}

/**
 * 删除分类同时删除相关全部数据
 * @param req
 * @param res
 * @param next
 */
function deleteOne (req, res, next) {
  let id = req.params.id
  let cond = {}
  if (!req.body.type) {
    return res.json({
      success: false,
      message: '没指定删除等级'
    })
  }
  if (req.body.type === 'lv1') {
    cond.parent = id
  } else if (req.body.type === 'lv2') {
    cond._id = id
  } else {
    return res.json({
      success: false,
      message: '未知等级'
    })
  }
  DAPIC.DynamicAPICategory.find(cond, (err, docs) => {
    if (err) return next(err)
    if (docs) {
      let keys = []
      _.each(docs, (item) => {
        keys.push(item.key)
      })
      // 批量删除关联的数据
      cms.DynamicAPIModel.remove({key: {$in: keys}}, (err, d) => {
        if (err) return next(err)
        Promise.all([
          DAPIC.DynamicAPICategory.remove({parent: id}),
          DAPIC.DynamicAPICategory.remove({_id: id})
        ]).then(results => {
          res.json({
            success: true
          })
        })
      })
    }
  })
  // DAPIC.DynamicAPICategory.remove({parent: id}, (err, p) => {
  //   if (err) return next(err)
  //   DAPIC.DynamicAPICategory.remove({_id: id}, (err, doc) => {
  //     if (err) return next(err)
  //     // remove level2
  //     res.json({
  //       success: true
  //     })
  //   })
  // })
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne
}
