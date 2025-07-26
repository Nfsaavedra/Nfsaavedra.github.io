import '@/scss/custom.scss'
import '@/scss/leaflet-fix.scss'
import 'leaflet/dist/leaflet.css'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueSessionStorage from 'vue-sessionstorage';

import App from './App.vue'
import LeafletSetup from './components/LeafletSetup'
import Analytics from './plugins/analytics'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSessionStorage);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)
Vue.use(LeafletSetup)
Vue.use(Analytics)

    new Vue({router, render: h => h(App)})
        .$mount('#app')
