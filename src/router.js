import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from './views/Test.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: []
    },{
        path: '/login',
        name: 'test',
        component: Test,
        children: []
      }
  ]
})
export default router;