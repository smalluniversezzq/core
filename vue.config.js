let path = require('path')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil')
const { resolveCss } = require('./src/utils/theme-color-replacer-extend')
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  devServer: {
    open: true,
    hot: true,
    proxy: {
      '/mock': { // 接口中加上'/mock'，会反向代理到rap2.taobao.org中的模拟接口
        target: 'http://rap2.hnbangyao.com:38080/app/mock/19',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      },
      '^/admin': { //接口包含'/admin'，会反向代理到target指定服务器
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
      },
      '/byf': { // byf开头，请求本地node服务
        target: 'https://byf-api.bangyaosoft.cn',
        changeOrigin: true
      },
      '/leiLocal': { // 接口中加上'/leiLocal'，会反向代理到 https://byf.www.com
        target: 'https://byf.www.com',
        changeOrigin: true,
        pathRewrite: {
          '^/leiLocal': ''
        }
      },
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          test:/\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
        })
      )
    }
  },
  chainWebpack: config => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (process.env.NODE_ENV === 'production') {
      config.plugin('optimize-css')
        .tap(args => {
          args[0].cssnanoOptions.preset[1].colormin = false
          return args
        })
    }
    config.plugin('html').tap(args => {
      args[0].title = '邦耀科技'
      return args
    })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: './',
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: false
}
