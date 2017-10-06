export default {
  state: {
    loading: false,
    error: null,
    toaster: null,
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
      state.toaster = payload
    },
    clearToaster (state) {
      state.toaster = null
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
