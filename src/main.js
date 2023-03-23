import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import VueMask from 'v-mask'
import { createPinia, PiniaVuePlugin } from 'pinia'
import i18n from './plugins/i18n'
import SessionUtils from './utils/SessionUtils';
//attach pinia state manager
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)
Vue.use(VueMask)
Vue.config.productionTip = false

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
