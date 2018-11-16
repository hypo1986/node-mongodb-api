/**
 * Created * 2017/3/20.
 */
const models = require('../../models/cms/index');
const dbHelper = require('../../lib/dbHelper');
const _ = require('lodash');

function create (req, res, next) {
  const db = new models.ModuleModel(req.body);
  db.save(function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function updateOne (req, res, next) {
  const id = req.params.id; // 获取ID

  models.ModuleModel.update({_id: id}, _.assign(req.body, {updateAt: new Date()}), {
    upsert: true,
    safe: true
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function deleteOne (req, res, next) {
  const id = req.params.id; // 获取ID
  models.ModuleModel.remove({_id: id}, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

function findOne (req, res, next) {
  const id = req.params.id; // 获取ID
  models.ModuleModel.find({_id: id}, function (err, data) {
    if (data && data.length > 0) {
      res.json({
        success: true,
        data: data[0]
      });
    } else {
      res.json({
        success: false,
        error: {
          message: '没有查到匹配的项目'
        }
      });
    }
  });
}

// router.get('/list', function (req,res,next) {
//
//   const queryParams = req.query || {};
//
//   models.ModuleModel.find(queryParams, function (err, data) {
//     if(data && data.length>0){
//       res.json({
//         success: true,
//         data: _.groupBy(data,function (obj) {
//           return obj.category
//         })
//       })
//     }else{
//       res.json({
//         success:false,
//         error:{
//           message:'没有查到匹配的项目'
//         }
//       });
//     }
//   });
//
//
//
// });

function list (req, res, next) {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || null;

  const queryParams = req.query;
  delete queryParams.page;
  delete queryParams.pageSize;

  dbHelper.pageQuery(page, pageSize, models.ModuleModel, '', queryParams, {
    updateAt: 'desc'
  }, function (err, data) {
    if (err) return next(err);
    res.json({
      success: true,
      data: data
    });
  });
}

module.exports = {
  create,
  updateOne,
  findOne,
  list,
  deleteOne
};
