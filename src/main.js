import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import ByfComponents from '@/components/byf'

// 增加fragment
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
// 滑动验证插件
// import SlideVerify from 'vue-monoplasty-slide-verify';
// Vue.use(SlideVerify);

// 为了方便后续使用async/await 实现 一些异步函数的同步调用效果，封装一个async 的初始化函数
async function initApp() {
  const router = await initRouter(store.state.setting.asyncRoutes)

  
  const i18n = initI18n('CN', 'US')
  bootstrap({ router, store, i18n })

  Vue.config.productionTip = false
  Vue.use(Viser)
  Vue.use(Antd)
  Vue.use(Plugins)
  Vue.use(ByfComponents)
  router.beforeEach((to, from, next) => {
    // ...
    if(to.path == '/login' && localStorage.getItem('uSid') && localStorage.getItem('admin.user')){
      // 进入登录页且有uSid时，重定向到首页
      next('/')
    }else{
      next()
    }
  })

 

  
  window.vueObj = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')
}
initApp();
