import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import posts from './modules/posts'
import categories from './modules/categories'
import cats from './modules/cats'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth: auth,
    posts: posts,
    categories: categories,
    cats: cats,
  },
  plugins: [createPersistedState()]
})
