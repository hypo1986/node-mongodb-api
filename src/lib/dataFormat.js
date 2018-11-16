/**
 * Created * 2017/3/20.
 */

const error = {
  message: '',
  code: '001'
}

module.exports = {
  success: {
    success: true,
    data: [], // or Object
    error: null
  },
  fail: {
    success: false,
    data: [], // or Object
    error: error
  }
}
