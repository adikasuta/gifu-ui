import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import VueMask from 'v-mask'
import { createPinia, PiniaVuePlugin } from 'pinia'
import i18n from './plugins/i18n'
import VueCookies from 'vue-cookies'
//attach pinia state manager
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)
Vue.use(VueMask)
Vue.use(VueCookies, { expire: '7d'})
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
