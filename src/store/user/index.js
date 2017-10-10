import * as firebase from 'firebase'
import router from '../../router'

export default {
  state: {
    user: null
  },
  mutations: {
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
    }
  },
  actions: {
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
          router.push({name: 'Home'})
          commit('setToaster', 'Votre profil a bien été modifié')
          setTimeout(() => {
            commit('clearToaster')
          }, 5000)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateUserPassword ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(getters.user.email, payload.password)
        .then(() => {
          firebase.auth().currentUser.updatePassword(payload.newPassword)
            .then(() => {
              commit('setLoading', false)
              commit('setModal', false)
              commit('setToaster', 'Le mot de passe a bien été modifié')
              setTimeout(() => {
                commit('clearToaster')
              }, 5000)
            })
            .catch(error => {
              commit('setLoading', false)
              console.log(error)
            })
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            firebase.database().ref('/users/').child(user.uid).set({
              username: payload.username,
              email: payload.email,
              phone: payload.phone,
              avatar: payload.avatar,
              admin: payload.admin
            })
              .then(
                () => {
                  const newUser = {
                    id: user.uid,
                    username: payload.username,
                    email: payload.email,
                    phone: payload.phone,
                    avatar: payload.avatar,
                    admin: payload.admin
                  }
                  commit('setLoading', false)
                  commit('setUser', newUser)
                  commit('setToaster', 'L\'utilisateur ' + payload.username + ' à bien été crée')
                  setTimeout(() => {
                    commit('clearToaster')
                  }, 5000)
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
      firebase.database().ref('/users/' + payload.uid)
        .once('value')
        .then((data) => {
          commit('setUser', {
            id: payload.uid,
            email: payload.email,
            phone: data.val().phone,
            avatar: data.val().avatar,
            admin: data.val().admin,
            username: data.val().username
          })
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
