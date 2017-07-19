import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import nowplaying from '@/components/nowplaying'
import MovieDetail from '@/components/MovieDetail'
import coming from '@/components/coming'
import usamovie from '@/components/usamovie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/nowplaying',
      name: 'nowplaying',
      component: nowplaying
    },    
    {
      path: '/coming',
      name: 'coming',
      component: coming
    }, 
    {
      path: '/usamovie',
      name: 'usamovie',
      component: usamovie
    },
    {
    path : '/subject/:id',
    component:MovieDetail
    },
  ]
})
