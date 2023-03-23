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
import LoginComponent from '../views/loginComponent';
import DashboardComponent from '../views/DashboardComponent';
import WorkflowComponent from '../views/internal-dashboard/Workflow';
import VariantComponent from '../views/internal-dashboard/variant/Variant';
import EditVariantPage from '../views/internal-dashboard/variant/EditVariantPage';
import CreateVariantPage from '../views/internal-dashboard/variant/CreateVariantPage';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomepageComponent',
    component: HomepageComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/theTracking',
    name: 'TrackingComponent',
    component: TrackingComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/souvenir',
    name: 'SouvenirComponent',
    component: SouvenirComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/OrderSouvenir',
    name: 'OrderSouvenirComponent',
    component: OrderSouvenirComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/InvoiceSouvenir',
    name: 'InvoiceSouvenirComponent',
    component: InvoiceSouvenirComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/Invitation',
    name: 'InvitationComponent',
    component: InvitationComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/OrderInvitation',
    name: 'OrderInvitationComponent',
    component: OrderInvitationComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/InvoiceInvitation',
    name: 'InvoiceInvitationComponent',
    component: InvoiceInvitationComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/designInvitation',
    name: 'designInvitationComponent',
    component: designInvitationComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/Cart',
    name: 'CartComponent',
    component: CartComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/Checkout',
    name: 'CheckoutComponent',
    component: CheckoutComponent,
    meta:{
      hideSidebar: true,
    }
  },
  {
    path: '/Login',
    name: 'LoginComponent',
    component: LoginComponent,
    meta:{
      hideHeader: true,
      hideSidebar: true,
      hideFooter: true,
    }
  },
  {
    path: '/Dashboard',
    name: 'DashboardComponent',
    component: DashboardComponent,
    meta:{
      requiresAuth: true,
      breadcrumb:[
        {name: "Home"}
      ]
    }
  },
  {
    path: '/Dashboard/workflow',
    name: 'WorkflowComponent',
    component: WorkflowComponent,
    meta:{
      requiresAuth: true,
      breadcrumb:[
        {name: "Home", link: "#/dashboard"},
        {name: "Search Workflow"}
      ]
    }
  },
  {
    path: '/Dashboard/variant',
    name: 'VariantComponent',
    component: VariantComponent,
    meta:{
      requiresAuth: true,
      breadcrumb:[
        {name: "Home", link: "#/dashboard"},
        {name: "Search Variant"}
      ]
    }
  },
  {
    path: '/Dashboard/variant/add',
    name: 'AddVariantComponent',
    component: CreateVariantPage,
    meta:{
      requiresAuth: true,
      breadcrumb:[
        {name: "Home", link: "#/dashboard"},
        {name: "Search Variant", link: "#/dashboard/variant"},
        {name: "Add Variant"}
      ]
    }
  },
  {
    path: '/Dashboard/variant/:id',
    name: 'EditVariantComponent',
    component: EditVariantPage,
    meta:{
      requiresAuth: true,
      breadcrumb:[
        {name: "Home", link: "#/dashboard"},
        {name: "Search Variant", link: "#/dashboard/variant"},
        {name: "Edit Variant"}
      ]
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
