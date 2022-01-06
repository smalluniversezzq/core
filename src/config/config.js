/*
 * @Author: your name
 * @Date: 2021-03-23 16:07:52
 * @LastEditTime: 2021-03-23 16:09:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/config/config.js
 */
// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  theme: {
    color: '#1890ff',
    mode: 'light'
  },
  hideSetting: true,  
  multiPage: true,
  animate: {
    disabled: true,
    name: 'fade',
    direction: 'default'
  },
  asyncRoutes: process.env.VUE_APP_DEVELOP_GROUP == 'core',  // 架构组使用动态路由，业务组使用静态路由
  iconfontUrl: [// 注意：每个iconfont项目的图标前缀不能重复，防止图标类名重复造成覆盖导致不能达到预期
    '//at.alicdn.com/t/font_1660488_2oru0lvehbo.js', // 远程矢量图标库地址(系统使用)
    '//at.alicdn.com/t/font_2242871_2jcgzmn8kpn.js', // 远程矢量图标库地址(装修1，注意：替换时需要同时替换对应的json文件)
    '//at.alicdn.com/t/font_2245519_c5k2fh3w5u8.js', // 远程矢量图标库地址(装修2，注意：替换时需要同时替换对应的json文件)
    '//at.alicdn.com/t/font_2245577_xf61rhzeqgl.js', // 远程矢量图标库地址(装修3，注意：替换时需要同时替换对应的json文件)
  ],
  iconfontClasses: [
    '//at.alicdn.com/t/font_1660488_2oru0lvehbo.css', // 远程矢量图标库地址(系统使用)
    '//at.alicdn.com/t/font_2242871_2jcgzmn8kpn.css', // 远程矢量图标库地址(装修1，注意：替换时需要同时替换对应的json文件)
    '//at.alicdn.com/t/font_2245519_c5k2fh3w5u8.css', // 远程矢量图标库地址(装修2，注意：替换时需要同时替换对应的json文件)
    '//at.alicdn.com/t/font_2245577_xf61rhzeqgl.css', // 远程矢量图标库地址(装修3，注意：替换时需要同时替换对应的json文件)
  ]
}
