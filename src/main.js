import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import VueMask from 'v-mask'
import { createPinia, PiniaVuePlugin } from 'pinia'
import i18n from './plugins/i18n'
import SessionUtils from './utils/SessionUtils';
import {
  extend,
} from "vee-validate/dist/vee-validate.full";
import VueRadioButton from "vue-radio-button";

Vue.use(VueRadioButton);
//attach pinia state manager
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)
Vue.use(VueMask)
Vue.config.productionTip = false

extend("file_size", {
  validate: (value) => {
    if (value && value.size > 2 * 1024 * 1024) {
      return false;
    }
    return true;
  },
  message: () => `File size exceeds limit of 2MB`,
});

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR'
  });
  return formatter.format(value);
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!SessionUtils.isAuthorized()){
      next({ name: 'LoginComponent' })
    } else {
      const sessionData = SessionUtils.getSessionData();
      if(to.matched.some(record=>record.meta.requiresPermission)){
        if(to.matched.some(record=>{
          return sessionData.permissions.includes(record.meta.requiresPermission)
        })){
          next();
        }else {
          next({ name: 'LoginComponent' })//TODO: change to unauthorize page
        }
      }else {
        next();
      }
    }
  }else{
    next();
  }
})

new Vue({
  i18n,
  router,
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
