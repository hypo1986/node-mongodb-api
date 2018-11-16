/**
 * Created * 2017/8/16.
 */
const rp = require('request-promise')

function parseJson (json) {
  let data = {}
  if (typeof json === 'string') {
    try {
      data = JSON.parse(json)
    } catch (e) {}
  } else {
    data = json
  }
  return data
}

function oauthCheck (req, res, next) {
  if (req.method.toLowerCase() !== 'get') {
    let headers = {
      cookie: req.headers.cookie,
      'Custom-agent': 'pcweb'
    }
    rp({
      uri: global.config.api.oauthHost + '/api/user/getInfo',
      headers: headers,
      json: true
    }).then(function (d) {
      d = parseJson(d)
      if (d.success && d.data && d.data.isLogin) {
        next()
      } else {
        res.status(401)
        let err = new Error('Authorization fail')
        err.status = 401
        next(err)
      }
    }).catch((err) => {
      next(err)
    })
  } else {
    next()
  }
}

module.exports = oauthCheck
