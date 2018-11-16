/**
 * Created * 2017/3/20.
 */
const config = {
  api: {
    host: '0.0.0.0',
    port: 5016,
    oauthHost: 'http://cms-test.ttttt.inc'
  },
  proxy: {
    api: {}
  },
  API_PREFIX: '/pcms/api/v2',
  mongodb: {
    user: 'beta_mongo',
    pass: '68VkGcqHwkM1',
    hostNames: ['10.255.73.174:40000', '10.255.73.175:40000', '10.255.73.176:40000'],
    db: 'pc_cms'
  },
  zookeeper: {
    hosts: ['bzk1.ttttt.inc:2181', 'bzk2.ttttt.inc:2181', 'bzk3.ttttt.inc:2181'],
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
    ldapUrl: 'ldap://10.255.0.189:389',
    bindDn: 'CN=wayne,CN=Users,DC=ttttt,DC=inc',
    password: 'eds.ebj1',
    base: 'OU=xxx,DC=ttttt,DC=inc',
    uid: 'mailNickname'
  },
  uploadServerUrl: 'http://ha3.local.ttttt.com:16952',
  imgUrl: 'https://img.ttttt.com',
  mcmshost: 'http://cms-test.ttttt.inc'
}

module.exports = config
