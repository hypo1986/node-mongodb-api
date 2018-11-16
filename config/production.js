/**
 * 生产环境配置文件
 */
const config = {
  api: {
    host: '0.0.0.0',
    port: 5016,
    oauthHost: 'http://lvs9.local.ttttt.com:16659'
  },
  API_PREFIX: '/pcms/api/v2',
  // 已废弃
  mongodb: {
    user: 'pro_pccms',
    pass: 'gN3kH1whP75N',
    hosts: [],
    db: 'pc_cms'
  },
  zookeeper: {
    hosts: [
      'zk1.local.ttttt.com:2181',
      'zk2.local.ttttt.com:2181',
      'zk3.local.ttttt.com:2181',
      'zk4.local.ttttt.com:2181',
      'zk5.local.ttttt.com:2181'
    ],
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
  mcmshost: 'http://lvs9.local.ttttt.com:16659'
}

module.exports = config
