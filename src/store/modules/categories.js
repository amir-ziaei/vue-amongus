import axios from 'axios'

export default {
  state: {
    error: null,
    categories: null
  },
  mutations: {
    setCategories(state, categories) {
        state.categories = categories;
    },
    addCategory(state, category) {
      state.categories.push(category);
    },
    deleteCategory(state, id) {
      state.categories = state.categories.filter(cat => { return cat.id != id });
    },
    setError(state, error) {
        state.error = error;
    },
  },
  actions: {
    SetCats({ commit }, categories) {
      commit('setCategories', categories)
    },
    RemoveCat({ commit }, id) {
      commit('deleteCategory', id)
    },
    GetCategories({ commit }) {
      return new Promise((resolve, reject) => {
            axios
              .get(`categories`)
              .then(resp => {
                commit('setCategories', resp.data.data)
                resolve(resp)
              })
              .catch(err => {
                commit('setError', err)
                reject(err)
              })
        })
    },
    DeleteCategory({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios
              .delete(`categories/${id}/delete`)
              .then(resp => {
                commit('deleteCategory', id)
                resolve(resp)
              })
              .catch(err => {
                commit('setError', err)
                reject(err)
              })
        })
    },
    InsertCategory({ commit }, category) {
        return new Promise((resolve, reject) => {
            axios
              .post(`categories`, {data: category})
              .then(resp => {
                commit('addCategory', resp.data.data)
                resolve(resp)
              })
              .catch(err => {
                commit('setError', err)
                reject(err)
              })
        })
    }
  },
  getters: {
    StateCatError: (state) => state.error,
    StateCategories: (state) => state.categories,
  }
}
