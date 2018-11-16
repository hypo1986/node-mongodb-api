/**
 * Created * 2017/11/24.
 */

const express = require('express')
const router = express.Router()
module.exports = router

const dynamicAPICategory = require('../../controllers').cms.dynamicAPICategory

// 兼容旧版本
router.post('/create', dynamicAPICategory.create)
router.get('/list', dynamicAPICategory.list)
router.get('/get/:id', dynamicAPICategory.findOne)
router.post('/update/:id', dynamicAPICategory.updateOne)
router.post('/delete/:id', dynamicAPICategory.deleteOne)

router.get('/category/:parent', function (req, res, next) {
  let parent = req.params.parent
  if (parent) {
    res.json({
      success: true,
      data: [
        {
          _id: 'abc01',
          parent: 'book01',
          name: 'book_book1',
          dataType: 'list',
          key: 'key_demo',
          fields: [
            {
              label: '',
              keyName: 'key-name',
              defaultValue: '',
              lock: false,
              type: 'text'
            }
          ]
        }
      ]
    })
  } else {
    res.json({
      success: true,
      data: [
        {
          _id: 'book01',
          parent: null,
          name: '书籍1',
          englishName: 'book1'
        },
        {
          parent: null,
          name: '书籍2',
          englishName: 'book2'
        }
      ]
    })
  }
})
