import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Hue from '../views/Hue/Hue.vue'
import HueHub from '../views/Hue/HueHub.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hue',
    component: Hue
  },
  {
    path: '/hub/',
    name: 'HueHub',
    component: HueHub,
    /**
     * Bellow is to pass routes parameters as props for the HubHub view
     * Parameters passed should be : [id, ip, username] 
     */
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
