import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vueHeadful from 'vue-headful'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import store from './store/index'
import axios from 'axios'
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};
Vue.use(VueHtmlToPaper, options);

library.add(faBars, faMap)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-headful', vueHeadful)

Vue.use(Vuelidate)
Vue.use(Notifications)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8888/api/v1/'
})

const auth = localStorage.getItem('auth')
if (auth) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = auth
}

Vue.prototype.$http.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
      store.dispatch('logout')
      return router.push('/login')
  }
  throw err.response.data.message
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
