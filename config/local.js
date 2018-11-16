/**
 * Created * 2018/2/9.
 */
const config = {
  api: {
    host: '127.0.0.1',
    port: 5016,
    oauthHost: 'http://cms-test.tttt.inc'
  },
  API_PREFIX: '/api/v2',
  mongodb: {
    user: 'beta_mongo',
    pass: 'qwertt',
    hostNames: ['10.255.0.174:40000', '10.255.0.175:40000', '10.255.0.176:40000'],
    db: 'pc_cms'
  },
  zookeeper: {
    // hosts: ['tzk1.ttttt.inc:2181'],
    hosts: ['bzk1.xxxx.inc:2181', 'bzk2.xxxx.inc:2181', 'bzk3.xxxx.inc:2181'],
    mongodb: {
      path: '/CONFIG_CENTER/mongodb/mongodb.',
      hosts: 'mongo.pro.pc_cms.url.rw',
      user: 'mongo.pro.pc_cms.user.rw',
      pwd: 'mongo.pro.pc_cms.pwd.rw',
      db: 'mongo.pro.pc_cms.db.rw'
    }
  },
  collection: {
    cms_prefix: 'pcms_',
    permission_prefix: 'permission_',
    file_prefix: 'file_',
    im_prefix: 'im_',
    resource_prefix: 'resource_'
  },
  ldap: {
    ldapUrl: 'ldap://10.255.0.0:389',
    bindDn: 'CN=wayne,CN=Users,DC=tttt,DC=inc',
    password: 'eds.ebj1',
    base: 'OU=tttt,DC=tttt,DC=inc',
    uid: 'mailNickname' // mailNickname, mobile
  },
  uploadServerUrl: 'http://h.tttt.com:16952',
  imgUrl: 'https://img.tttt.com',
  mcmshost: 'http://cms-test.tttt.inc'
}

module.exports = config
