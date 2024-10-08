import Vue from 'vue'
import VueRouter from 'vue-router'
import ForbiddenPage from '../views/ForbiddenPage';
import HomepageComponent from '../views/Homepage';
import TrackingComponent from '../views/theTracking';
import CheckoutComponent from '../views/CheckoutComponent';
import LoginComponent from '../views/loginComponent';
import WorkflowComponent from '../views/internal-dashboard/Workflow';
import VariantComponent from '../views/internal-dashboard/variant/Variant';
import EditVariantPage from '../views/internal-dashboard/variant/EditVariantPage';
import CreateVariantPage from '../views/internal-dashboard/variant/CreateVariantPage';
import SearchUsers from '../views/internal-dashboard/administration/SearchUsers';
import SearchProduct from '../views/internal-dashboard/product/SearchProduct';
import AddProduct from '../views/internal-dashboard/product/AddProduct';
import EditProduct from '../views/internal-dashboard/product/EditProduct';
import ProductDisplay from '../views/external-pages/order/ProductDisplay';
import ProductDetail from '../views/external-pages/order/ProductDetail';
import InvoicePage from '../views/external-pages/order/InvoicePage';
import CartPage from '../views/external-pages/order/CartPage';
import HomepageDashboard from "../views/internal-dashboard/home-pages/HomepageDashboard";
import ProfileComponent from "../views/internal-dashboard/administration/UserProfile";
import AddUser from "../views/internal-dashboard/administration/AddUser";
import EditUser from "../views/internal-dashboard/administration/EditUser";
import ChangePasswordComponent from "../views/internal-dashboard/administration/ChangePassword";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomepageComponent',
    component: HomepageComponent,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/forbidden',
    name: 'ForbiddenPage',
    component: ForbiddenPage,
    meta: {
      hideHeader: true,
      hideSidebar: true,
      hideFooter: true,
    }
  },
  {
    path: '/products',
    name: 'ProductDisplayComponent',
    component: ProductDisplay,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetailComponent',
    component: ProductDetail,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/order/:orderCode/invoice',
    name: 'OrderInvoiceComponent',
    component: InvoicePage,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/cart',
    name: 'CartComponent',
    component: CartPage,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/tracking',
    name: 'TrackingComponent',
    component: TrackingComponent,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/Checkout',
    name: 'CheckoutComponent',
    component: CheckoutComponent,
    meta: {
      hideSidebar: true,
    }
  },
  {
    path: '/Login',
    name: 'LoginComponent',
    component: LoginComponent,
    meta: {
      hideHeader: true,
      hideSidebar: true,
      hideFooter: true,
    }
  },
  {
    path: '/dashboard',
    name: 'DashboardComponent',
    component: HomepageDashboard,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home" }
      ],
    }
  },
  {
    path: '/dashboard/user',
    name: 'SearchUsers',
    component: SearchUsers,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Users" }
      ],
      hasPermission: "user_search"
    }
  },
  {
    path: '/dashboard/user/add',
    name: 'AddUser',
    component: AddUser,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Users", link: "#/dashboard/user" },
        { name: "Add Users" }
      ],
      hasPermission: "user_add"
    }
  },
  {
    path: '/dashboard/user/:id',
    name: 'EditUser',
    component: EditUser,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Users", link: "#/dashboard/user" },
        { name: "Edit Users" }
      ],
      hasPermission: "user_edit"
    }
  },
  {
    path: '/dashboard/product',
    name: 'SearchProductComponent',
    component: SearchProduct,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Product" }
      ],
      hasPermission: "product_search"
    }
  },
  {
    path: '/dashboard/product/add',
    name: 'AddProductComponent',
    component: AddProduct,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Product", link: "#/dashboard/product" },
        { name: "Add Product" }
      ],
      hasPermission: "product_add"
    }
  },
  {
    path: '/dashboard/product/:id',
    name: 'EditProductComponent',
    component: EditProduct,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Product", link: "#/dashboard/product" },
        { name: "Edit Product" }
      ],
      hasPermission: "product_edit"
    }
  },
  {
    path: '/dashboard/workflow',
    name: 'WorkflowComponent',
    component: WorkflowComponent,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Workflow" }
      ],
      hasPermission: "workflow_search"
    }
  },
  {
    path: '/dashboard/variant',
    name: 'VariantComponent',
    component: VariantComponent,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Variant" }
      ],
      hasPermission: "catalog_search"
    }
  },
  {
    path: '/dashboard/variant/add',
    name: 'AddVariantComponent',
    component: CreateVariantPage,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Variant", link: "#/dashboard/variant" },
        { name: "Add Variant" }
      ],
      hasPermission: "catalog_add"
    }
  },
  {
    path: '/dashboard/variant/:id',
    name: 'EditVariantComponent',
    component: EditVariantPage,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Search Variant", link: "#/dashboard/variant" },
        { name: "Edit Variant" }
      ],
      hasPermission: "catalog_edit"
    }
  },
  {
    path: '/dashboard/profile',
    name: 'ProfileComponent',
    component: ProfileComponent,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Profile" }
      ]
    }
  },
  {
    path: '/dashboard/change-password',
    name: 'ChangePasswordComponent',
    component: ChangePasswordComponent,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: "Home", link: "#/dashboard" },
        { name: "Change Password" }
      ]
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
