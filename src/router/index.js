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
  {
    path: '/Login',
    name: 'LoginComponent',
    component: LoginComponent
  },
  {
    path: '/Dashboard',
    name: 'DashboardComponent',
    component: DashboardComponent
  },
  {
    path: '/Dashboard/workflow',
    name: 'WorkflowComponent',
    component: WorkflowComponent
  },
  {
    path: '/Dashboard/variant',
    name: 'VariantComponent',
    component: VariantComponent,
    meta:{
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
