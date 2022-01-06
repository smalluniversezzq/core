// 练手页面的路由的映射
export default {
  workplace: {
    name: 'workplace',
    component: () => import('@/pages/dashboard/workplace'),
    meta:{
      keepAlive: false,
      title: 'workplace'
    }
  },
  analysis: {
    name: 'analysis',
    component: () => import('@/pages/dashboard/analysis'),
    meta:{
      keepAlive: false,
      title: 'analysis'
    }
  },
  /**基础表单 */
  basicFrom: {
    name: 'basicFrom',
    component: () => import('@/pages/form/basic'),
    meta:{
      keepAlive: false,
    }
  },
  /**分步表单 */
  stepFrom: {
    name: 'stepFrom',
    component: () => import('@/pages/form/step'),
    meta:{
      keepAlive: false,
    }
  },
  /**高级表单 */
  advanceFrom: {
    name: 'advanceFrom',
    component: () => import('@/pages/form/advance'),
    meta:{
      keepAlive: false,
    }
  },
  /**文章 */
  article: {
    name: 'article',
    component: () => import('@/pages/article/article'),
    meta:{
      keepAlive: false,
    }
  },
  /**文章列表 */
  articleList: {
    name: 'articleList',
    component: () => import('@/pages/article/articleList'),
    meta:{
      keepAlive: false,
    }
  },
  /**文章列表2 */
  articleList2: {
    name: 'articleList2',
    component: () => import('@/pages/article/articleList2'),
    meta:{
      keepAlive: false,
    }
  },
  /**文章列表3 */
  articleList3: {
    name: 'articleList3',
    component: () => import('@/pages/article/articleList3')
  },
  /**文章列表4 */
  articleList4: {
    name: 'articleList4',
    // component: () => import('@/pages/article/articleList4'),
  },
  /**文章列表4 */
  articleList5: {
    name: 'articleList5',
    // component: () => import('@/pages/article/articleList5'),
  },
  /**查询表格 */
  queryTable: {
    name: 'queryTable',
    component: () => import('@/pages/list/QueryList'),
    meta:{
      keepAlive: false,
    }
  },
}