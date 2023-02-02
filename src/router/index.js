import Vue from 'vue'
import VueRouter from 'vue-router'
import HomepageComponent from '../views/Homepage';
import TrackingComponent from '../views/theTracking';
import SouvenirComponent from '../views/Souvenir';
import OrderSouvenirComponent from '../views/OrderSouvenir';
import CartComponent from '../views/TheCart';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomepageComponent',
    component: HomepageComponent
  },
  {
    path: '/theTracking',
    name: 'TrackingComponent',
    component: TrackingComponent
  },
  {
    path: '/souvenir',
    name: 'SouvenirComponent',
    component: SouvenirComponent
  },
  {
    path: '/OrderSouvenir',
    name: 'OrderSouvenirComponent',
    component: OrderSouvenirComponent
  },
  {
    path: '/Cart',
    name: 'CartComponent',
    component: CartComponent
  },
]

const router = new VueRouter({
  routes
})

export default router
