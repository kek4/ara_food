import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEvents: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    subscribeUserForEvent (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.fbEventKey
      })
      const subscribers = event.subscribers.find(sub => {
        return sub.id === payload.id
      })
      if (subscribers === undefined) {
        event.subscribers.push({
          id: payload.id,
          comment: payload.comment
        })
      }
    },
    unSubscribeUserForEvent (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.fbEventKey
      })
      const subscribers = event.subscribers.find(sub => {
        return sub.id === payload.id
      })
      if (subscribers !== undefined) {
        event.subscribers.splice(event.subscribers.findIndex(sub => sub.id === payload.id), 1)
      }
    },
    setLoadedEvents (state, payload) {
      state.loadedEvents = payload
    },
    createEvent (state, payload) {
      state.loadedEvents.push(payload)
    },
    updateEventData (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      if (payload.title) {
        event.title = payload.title
      }
      if (payload.description) {
        event.description = payload.description
      }
    },
    updateProfileData (state, payload) {
      console.log(state.user.phone)
      console.log(payload.phone)
      if (payload.phone) {
        state.user.phone = payload.phone
      }
      if (payload.avatar) {
        state.user.avatar = payload.avatar
      }
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
    subscribeUserForEvent ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/events/' + payload.id).child('subscribers/' + user.id)
        .set({
          id: user.id,
          comment: payload.comment
        })
        .then((data) => {
          commit('setLoading', false)
          commit('subscribeUserForEvent', {
            id: user.id,
            comment: payload.comment,
            fbEventKey: payload.id
          })
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    unSubscribeUserForEvent ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/events/' + payload.id).child('subscribers/' + user.id)
        .remove()
        .then((data) => {
          commit('setLoading', false)
          commit('unSubscribeUserForEvent', {
            id: user.id,
            fbEventKey: payload.id
          })
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    loadEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('events').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            let subscribers = []
            if (obj[key].subscribers !== 'undefined') {
              subscribers = [obj[key].subscribers]
            }
            events.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
              subscribers: subscribers
            })
          }
          commit('setLoadedEvents', events)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
          // commit('setError', error)
        })
    },
    createEvent ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const event = {
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: '2017-08-21',
        creatorId: getters.user.id,
        subscribers: []
      }
      firebase.database().ref('events').push(event)
        .then((data) => {
          const key = data.key
          commit('setLoading', false)
          commit('createEvent', {
            ...event,
            id: key
          })
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
          // commit('setError', error)
        })
    },
    updateEventData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('events').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEventData', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateProfileData ({commit, getters}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.phone) {
        updateObj.phone = payload.phone
      }
      if (payload.avatar) {
        updateObj.avatar = payload.avatar
      }
      firebase.database().ref('users').child(getters.user.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateProfileData', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateUserPassword ({commit, getters}, payload) {
      firebase.auth().currentUser.updatePassword(payload.password)
        .then(() => {
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            firebase.database().ref('/users/').child(user.uid).set({
              email: payload.email,
              phone: payload.phone,
              avatar: payload.avatar,
              admin: payload.admin
            })
              .then(
              () => {
                const newUser = {
                  id: user.uid,
                  email: payload.email,
                  phone: payload.phone,
                  avatar: payload.avatar,
                  admin: payload.admin
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
            firebase.database().ref('/users/').child(user.uid).once('value')
              .then((data) => {
                const obj = data.val()
                const newUser = {
                  id: user.uid,
                  email: obj.email,
                  phone: obj.phone,
                  avatar: obj.avatar,
                  admin: obj.admin
                }
                commit('setLoading', false)
                commit('setUser', newUser)
              })
              .catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                }
              )
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        phone: payload.phone,
        avatar: payload.avatar,
        admin: payload.admin
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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
