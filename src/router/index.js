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
      component: index,
      // children: [
      //   {
      //     path: '/detail/:id',
      //     component: detail
      //   }
      // ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
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
      component: acomment
    },
    {
      path: '/theme/:id',
      name: 'theme',
      component: theme
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
