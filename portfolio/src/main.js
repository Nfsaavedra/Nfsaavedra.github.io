import './registerServiceWorker'
import '@/scss/custom.scss'
import '@/scss/leaflet-fix.scss'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueSessionStorage from 'vue-sessionstorage';

import App from './App.vue'
import LeafletSetup from './components/LeafletSetup'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSessionStorage);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)
Vue.use(LeafletSetup)

    new Vue({router, render: h => h(App)})
        .$mount('#app')
