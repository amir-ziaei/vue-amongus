import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null,
    auth: localStorage.getItem('auth') || null,
    user: null
  },
  mutations: {
    request (state) {
      state.status = 'loading'
    },
    auth_success (state, data) {
      state.status = 'success'
      state.auth = data[0]
      state.user = data[1]
    },
    register_success (state) {
      state.status = 'success'
    },
    error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = null
      state.auth = null
      state.user = null
      localStorage.removeItem('auth')
    }
  },
  actions: {
    login ({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('request')
        axios
          .post('/users/login', { data: credentials })
          .then(resp => {
            const auth = resp.data.data.auth
            const user = resp.data.data.user

            localStorage.setItem('auth', auth)
            axios.defaults.headers.common.Authorization = auth
            commit('auth_success', [auth, user])
            resolve(resp)
          })
          .catch(err => {
            commit('error')
            localStorage.removeItem('auth')
            reject(err)
          })
      })
    },
    register ({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit('request')
        axios
          .post('/users', { data: user })
          .then(resp => {
            dispatch('login', user)
            commit('register_success')
            resolve(resp)
          })
          .catch(err => {
            commit('error', err)
            localStorage.removeItem('auth')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        commit('logout')
        localStorage.removeItem('auth')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.auth,
    authStatus: state => state.status,
    stateUser: state => state.user,
    isExpired: state => {
      let expired = true;
      if(!! state.auth) {
        const d1 = new Date();
        const d2 = new Date(state.auth.expires_at);
        if(d2 > d1) {
          expired = false;
        }
      }
      return expired;
    },
  },
  plugins: [createPersistedState()]
})
