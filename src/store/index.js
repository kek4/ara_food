import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'http://www.voieverte.fr/wp-content/uploads/2016/05/VoieVerte-menu-semaine39.jpg',
        id: '1',
        title: '1st event',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ICJulf-eQTt5u2AmnU4ClH6Zo7WUeqTkm1Ws9KvlHn0m2EiXCXr3v90',
        id: '2',
        title: '2st event',
        date: '2017-08-21'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createEvent (state, payload) {
      state.loadedEvents.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createEvent ({commit}, payload) {
      const event = {
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        id: 'f4ds54f5ds'
      }
      commit('createEvent', event)
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredEvents: []
            }
            commit('setLoading', false)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredEvents: []
            }
            commit('setLoading', false)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedEvents (state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date
      })
    },
    nextEvents (state, getters) {
      return getters.loadedEvents.slice(0, 5)
    },
    loadedEvent (state) {
      return (eventId) => {
        return state.loadedEvents.find((event) => {
          return event.id === eventId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
