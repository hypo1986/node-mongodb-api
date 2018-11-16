/**
 * Created * 2017/3/20.
 */

const moment = require('moment')

module.exports = {
  formatDate: function (v) {
    if (!v) return v
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
  },
  getDateTime: function (datetime, num) {
    if (num) {
      return moment(datetime).add(num || 10, 'years').format()
    } else {
      return moment(datetime).format()
    }
  },
  isObject: function (o) {
    if ((typeof o === 'object') && (o !== null)) {
      return true
    } else {
      return false
    }
  }
}
