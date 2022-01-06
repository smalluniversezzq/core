/**
 * 帮助中心 邦耀文档中心
 */
export default {
    /**帮助中心 */
  help: {
    path: '/help',
    name: '平台入口页',
    component: () => import('@/pages/help/index'),
  },
  helpArticleIndex: {
    path: '/helpArticleIndex',
    name: 'helpArticleIndex',
    component: () => import('@/pages/help/article/index'),
  },
  helpArticleDetails: {
    path: '/helpArticleDetails',
    name: 'helpArticleDetails',
    component: () => import('@/pages/help/article/details'),
  }
}