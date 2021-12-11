import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import App from '../App.vue'
import '../assets/tailwind.css'
import router from '../router'
import storeInit, { commitCurrentConfigStore, commitCurrentSystemVars } from './store'

Vue.config.productionTip = false
Vue.use(Vuex)

// TODO: Créer le store Vuex pour stocker des éléments de state général comme par exemple le nom d'utilisateur, le nom de la machine ...
// Le hub actuellement actif ? (p.e faire autrement avec des "Nested Named Views" de VueRouter)
const store = new Vuex.Store(storeInit)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

// Setup values for Vuex store from current system value (Node) and local config file (electron-store) 
commitCurrentSystemVars(vue)
commitCurrentConfigStore(vue)

vue.$mount('#app')
