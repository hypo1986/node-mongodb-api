/**
 * Created * 2017/3/21.
 */
var props = {
  height: '',
  width: '',
  bgImg: '',
  bgColor: '',
  title: ''
};
// 开发设计模式:恢复状态格式
var pages = {
  createdAt: '20170321',
  pageName: 'xxx',
  pagePath: '/index',
  projectId: '',
  publishId: '',//发布后的ID,
  status: '',//发布状态,dev(开发),online(上线),offline(下线),大写
  user: '',//创建人
  head: { // type=cms使用,发布后要先合并到html上
    title: 'title',
    commonCss: [],
    commonJs: [],
    libJs: [],
    seo: '',
    mata: [{ // meta字段与实际情况匹配
      keywords: '',
      description: ''
    }]
  },
  type: 'cms,web',
  components: [
    {
      floorId: '',
      attributes: [],//自定义dom属性,埋点考虑
      className: '',
      drag: 1,//是否可拖动
      originalModuleId: '',
      props: {
        height: '10px',
        width: '10px',
        backgroundImage: '',
      },
      layouts: [
        {
          props: {
            layoutId: '',
            domId: '',
            className: '',
            attributes: [],
            col: [{
              className: 'col-2',
              width: '20%'
            }]
          },
          modules: [
            {
              mode: '',//list,item,.... 决定产品显示情况,是列表还是独立产品,列表一个模块即可
              loop: 'N',// 循环次数
              moduleId: '',//当前页面唯一ID
              domId: '',
              originalModuleId: '',//关联源模板id,可以找到module template attribute template
              className: '',// 扩展class
              //....
            }
          ]
        }
      ]
    }
  ]
};


/**
 * 另外存储一份线上的,保障线上数据安全
 * 线上部分:
 * 1.动态css,js加载
 * 2.模板渲染
 */
const onlinePage = {
  "pageName": "testpage",
  "pagePath": "/index",
  "pageId": "58e4895c4c030212ec0b66cc",
  "jsLink": ["/assets/js/test.js"],
  "cssLink": ["/assets/css/css.js"],
  "templates": "<div></div>",
  "user": "lvxin",
  "type": "web",
  "components": [{
    "props": {
      "floorId": "floorId",
      "domId": "domId",
      "className": "className",
      "attributes": ["attributes"]
    },
    "drag": 1,
    "layouts": [{
      "props": {
        "layoutId": "layoutId",
        "domId": "domId",
        "className": "className",
        "attributes": ["attributes"],
        "col": [{"className": "col-2", "width": "20%"}]
      },
      "modules": [{
        "mode": "mode",
        "loop": "N",
        "moduleId": "moduleId",
        "domId": "domId",
        "originalModuleId": "originalModuleId",
        "className": "className"
      }]
    }]
  }]
}

const page = {
  "pageName": "page1",
  "pagePath": "/page/page1",
  "project": "58df202e5dde5512551f4ce1",
  "status": "dev",
  "user": "lvxin",
  "templates": {
    "f1": ""
  },
  "head": {
    "title": "title",
    "commonCss": ["/assets/css/css.js"],
    "commonJs": ["/assets/js/js.js"],
    "libJs": ["/lib/lib.js"],
    "seo": "seo ",
    "mata": [{"keywords": "keywords", "description": "description"}]
  },
  "type": "web",
  "components": [
    {
      "props": {
        "floorId": "floorId",
        "domId": "domId",
        "className": "className",
        "attributes": ["attributes"]
      },
      "originalModuleId": "f1",
      "drag": 1,
      "layouts": [{
        "props": {
          "layoutId": "layoutId",
          "domId": "domId",
          "className": "className",
          "attributes": ["attributes"],
          "col": [{"className": "col-2", "width": "20%"}]
        },
        "modules": [{
          "mode": "mode",
          "loop": "N",
          "moduleId": "moduleId",
          "domId": "domId",
          "originalModuleId": "originalModuleId",
          "className": "className"
        }]
      }]
    }]
};
