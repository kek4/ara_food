export default {
  state: {
    loading: false,
    error: null,
    toaster: {display: false, data: ''},
    modal: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setToaster (state, payload) {
      state.toaster = {display: true, data: payload}
    },
    clearToaster (state) {
      state.toaster = {display: false, data: ''}
    },
    setModal (state, payload) {
      state.modal = payload
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    setModal ({commit}, payload) {
      commit('setModal', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    toaster (state) {
      return state.toaster
    },
    modal (state) {
      return state.modal
    }
  }
}
