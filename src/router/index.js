import Vue from 'vue'
import VueRouter from 'vue-router'
import HomepageComponent from '../views/Homepage';
import TrackingComponent from '../views/theTracking';
import SouvenirComponent from '../views/Souvenir';
import OrderSouvenirComponent from '../views/OrderSouvenir';
import InvoiceSouvenirComponent from '../views/invoiceSouvenir';
import InvitationComponent from '../views/Invitation';
import OrderInvitationComponent from '../views/OrderInvitation';
import InvoiceInvitationComponent from '../views/invoiceInvitation';
import designInvitationComponent from '../views/designInvitation';
import CartComponent from '../views/TheCart';
import CheckoutComponent from '../views/CheckoutComponent';


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
    path: '/InvoiceSouvenir',
    name: 'InvoiceSouvenirComponent',
    component: InvoiceSouvenirComponent
  },
  {
    path: '/Invitation',
    name: 'InvitationComponent',
    component: InvitationComponent
  },
  {
    path: '/OrderInvitation',
    name: 'OrderInvitationComponent',
    component: OrderInvitationComponent
  },
  {
    path: '/InvoiceInvitation',
    name: 'InvoiceInvitationComponent',
    component: InvoiceInvitationComponent
  },
  {
    path: '/designInvitation',
    name: 'designInvitationComponent',
    component: designInvitationComponent
  },
  {
    path: '/Cart',
    name: 'CartComponent',
    component: CartComponent
  },
  {
    path: '/Checkout',
    name: 'CheckoutComponent',
    component: CheckoutComponent
  },
]

const router = new VueRouter({
  routes
})

export default router
