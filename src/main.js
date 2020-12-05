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

library.add(faBars, faMap)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-headful', vueHeadful)

Vue.use(Vuelidate)
Vue.use(Notifications)

axios.defaults.baseURL = 'http://localhost:8888/api/v1/'
Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// Vue.prototype.$http.interceptors.response.use(undefined, function (err) {
//   return new Promise(function () {
//     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//       console.log(this.$store);
//       this.$store.dispatch('logout')
//       return router.push('/login')
//     }
//     return Promise.reject(err.response);
//   });
// });

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
