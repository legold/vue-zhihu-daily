import Vue from 'vue'
import Router from 'vue-router'

import Demo from '@/components/demo'
import index from '@/components/index/index'
import detail from '@/components/detail/detail'

import acomment from '@/components/detail/comment'
import theme from '@/components/theme/theme'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition){
     if(savedPosition){
        return savedPosition
     } else {
        return { x: 0, y: 0 }
     }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { index: 0 },   //meta对象的index用来定义当前路由的层级,由小到大,由低到高
      component: index,
      // children: [
      //   {
      //     path: '/detail/:id',
      //     component: detail
      //   }
      // ]
    },
    {
      path: '/theme/:id',
      name: 'theme',
      meta: { index: 1 },
      component: theme
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { index: 2 },
      component: detail,
      /*
      children: [
        {
          path: 'comment',
          component: acomment
        }
      ]
      */
    },
    {
      path: '/comment/:id',
      name: 'comment',
      meta: { index: 3 },
      component: acomment
    },
    
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '*',
      redirect: '/'
    }
    
  ]
})
