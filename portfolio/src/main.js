import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMeta from 'vue-meta'
import VueSessionStorage from "vue-sessionstorage";

import '@/scss/custom.scss'

Vue.config.productionTip = false

Vue.use(VueSessionStorage);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
