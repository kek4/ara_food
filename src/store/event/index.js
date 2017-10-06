import * as firebase from 'firebase'
import router from '../../router'
import moment from 'moment'
import { store } from '../index.js'

export default {
  state: {
    loadedEvents: []
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
    editComment (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.fbEventKey
      })
      const subscribers = event.subscribers.find(sub => {
        return sub.id === payload.id
      })
      subscribers.comment = payload.comment
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
    deleteEvent (state, payload) {
      state.loadedEvents.splice(state.loadedEvents.findIndex(event => event.id === payload.id), 1)
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
    updateDateEvent (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      if (payload.date) {
        event.date = payload.date
      }
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
    editComment ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/events/' + payload.id).child('subscribers/' + user.id)
        .update({
          comment: payload.comment
        })
        .then((data) => {
          commit('setLoading', false)
          commit('editComment', {
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
              const subList = obj[key].subscribers
              for (let key in subList) {
                subscribers.push(subList[key])
              }
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
        date: payload.date,
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
          store.dispatch('subscribeUserForEvent', {
            id: key,
            comment: ''
          })
          router.push({name: 'Events'})
          commit('setToaster', event.title + 'a été créer pour le ' + event.date)
          setTimeout(() => {
            commit('clearToaster')
          }, 5000)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
          // commit('setError', error)
        })
    },
    deleteEvent ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('events/' + payload.id).remove()
        .then(() => {
          commit('setLoading', false)
          commit('deleteEvent', {
            id: payload.id
          })
          if (router.currentRoute.name === 'Event') {
            router.push({name: 'Events'})
          }
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
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
    updateDateEvent ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('events').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateDateEvent', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    }
  },
  getters: {
    loadedEvents (state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date
      })
    },
    eventToCome (state, getters) {
      const event = getters.loadedEvents
      const today = moment()
      return event.filter((e) => {
        return moment(e.date).isAfter(today)
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
    }
  }
}
