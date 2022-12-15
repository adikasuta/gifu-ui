import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloComponent from '../views/Hello';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: HelloComponent
  },
]

const router = new VueRouter({
  routes
})

export default router
