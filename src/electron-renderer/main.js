import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import App from '../App.vue'
import '../assets/tailwind.css'
import router from '../router'
import storeInit, { initFromConfigStore, initFromCurrentSystemVars } from './store'
import Modal from "../components/Modal.vue"

// Global component registration
Vue.component('Modal', Modal)

Vue.config.productionTip = false
Vue.use(Vuex)

// TODO: Créer le store Vuex pour stocker des éléments de state général comme par exemple le nom d'utilisateur, le nom de la machine ...
// Le hub actuellement actif ? (p.e faire autrement avec des "Nested Named Views" de VueRouter)
const store = new Vuex.Store(storeInit)
// Setup values for Vuex store from current system value (Node) and local config file (electron-store) 
initFromCurrentSystemVars(store)
initFromConfigStore(store)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
