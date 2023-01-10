import Vue from 'vue'
import VueRouter from 'vue-router'
import HomepageComponent from '../views/Homepage';
import TrackingComponent from '../views/Tracking';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomepageComponent',
    component: HomepageComponent
  },
  {
    path: '/tracking',
    name: 'TrackingComponent',
    component: TrackingComponent
  },
]

const router = new VueRouter({
  routes
})

export default router
