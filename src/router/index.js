import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/主页面',
    children: [{
      path: '主页面',
      name: '主页面',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页面', icon: 'dashboard' }
    }]
  },

  {
    path: '/in',
    component: Layout,
    redirect: '/in/入库办理',
    name: '入库管理',
    meta: { title: '入库管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '入库办理',
        name: '入库办理',
        component: () => import('@/views/入库管理/入库办理'),
        meta: { title: '入库办理', icon: 'table' }
      },
      {
        path: '验货装盘',
        name: '验货装盘',
        component: () => import('@/views/入库管理/验货装盘'),
        meta: { title: '验货装盘', icon: 'table' }
      },
      {
        path: '费用结算',
        name: '费用结算',
        component: () => import('@/views/入库管理/费用结算'),
        meta: { title: '费用结算', icon: 'table' }
      },
      {
        path: '货物入库',
        name: '货物入库',
        component: () => import('@/views/入库管理/货物入库'),
        meta: { title: '货物入库', icon: 'table' }
      }
    ]
  },

  {
    path: '/to',
    component: Layout,
    redirect: '/to/过户办理',
    name: '过户业务',
    meta: { title: '过户业务', icon: 'el-icon-s-help' },
    children: [
      {
        path: '过户办理',
        name: '过户办理',
        component: () => import('@/views/过户管理/过户办理'),
        meta: { title: '过户办理', icon: 'table' }
      },
      {
        path: '验货确认',
        name: '验货确认',
        component: () => import('@/views/过户管理/验货确认'),
        meta: { title: '验货确认', icon: 'table' }
      }
    ]
  },

  {
    path: '/out',
    component: Layout,
    redirect: '/out/出库办理',
    name: '出库管理',
    meta: { title: '出库管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '出库办理',
        name: '出库办理',
        component: () => import('@/views/出库管理/出库办理'),
        meta: { title: '出库办理', icon: 'table' }
      },
      {
        path: '出库确认',
        name: '出库确认',
        component: () => import('@/views/出库管理/出库确认'),
        meta: { title: '出库确认', icon: 'table' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/客户管理',
    name: '管理员',
    meta: { title: '管理员', icon: 'el-icon-s-help' },
    children: [
      {
        path: '客户管理',
        name: '客户管理',
        component: () => import('@/views/管理员/客户管理'),
        meta: { title: '客户管理', icon: 'table' }
      },
      {
        path: '用户管理',
        name: '用户管理',
        component: () => import('@/views/管理员/用户管理'),
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/change',
    component: Layout,
    redirect: '/change/在库业务办理',
    name: '在库业务办理',
    meta: { title: '在库业务办理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '货物移盘',
        name: '货物移盘',
        component: () => import('@/views/在库业务办理/货物移盘'),
        meta: { title: '货物移盘', icon: 'table' }
      },
      {
        path: '货物调仓',
        name: '货物调仓',
        component: () => import('@/views/在库业务办理/货物调仓'),
        meta: { title: '货物调仓', icon: 'table' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.baidu.com',
        meta: { title: '返回', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
