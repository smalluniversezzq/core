export default [
  {
    /**
     * ！必读
     * 新增路由时，一级子路由的'path'不要以'/'开头，会影响到父级路由使用布局组件
     * 某个一级子路由有children时，给这个一级子路由设置 `component: () => import('@/layouts/BlankView'),`
     */
    path: 'main',
    name: 'mainPage',
    component: () => import('@/layouts/BlankView'),
    meta: {title: '控制台'},
    children: [
      {
        path: 'workplace',
        name: 'workplace',
        component: () => import('@/pages/dashboard/workplace/WorkPlace'),
        meta: {title: '工作台'}
      },
    ]
  }
]