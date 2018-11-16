/**
 * Created * 2017/3/21.
 */

/**
 * category:floor,type:floor
 * category:layout,column:1,2,3,..,12,type:horizontal,vertical,free...
 * category:module,type:product,menu .....
 */
// 开发模式:模块格式
const module = {
  _id: 'xxx',
  name: '',
  templates: {}, // 生产环境使用,需要预留,存储所有源模板,防止重复
  template: '',
  js: '',
  css: '',
  mode: 'list', // list渲染模式
  thumbnail: '', // 缩略图
  defaultProps: {
    moduleId: 'xx',
    width: '10px',
    height: '10px'
  }, // 默认属性,可覆盖
  attribute: {
    template: '',
    js: '',
    css: ''
  },
  apis: [], // 数据接口
  category: 'module', // layout,floor,....
  type: '', // 分类:例,产品、菜单...
  demoData: {}, // demo数据
  createdAt: '', // 创建日期
  user: ''
};

export default module;
