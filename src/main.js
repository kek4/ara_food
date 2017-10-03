import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Alert from './components/Shared/Alert.vue'
import EditEventDialogue from './components/Event/EditEventDialogue.vue'
import SubscribeDialogue from './components/Subscribe/SubscribeDialogue.vue'
import SubscribeCommentDialogue from './components/Subscribe/SubscribeCommentDialogue.vue'
import updateUserPassword from './components/User/UpdatePasswordDialogue.vue'
import Subscriber from './components/Subscribe/Subscriber.vue'
import DeleteEventDialog from './components/Event/DeleteEvent.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('app-edit-event-dialogue', EditEventDialogue)
Vue.component('app-event-subscribe-dialogue', SubscribeDialogue)
Vue.component('app-event-subscribe-comment-dialogue', SubscribeCommentDialogue)
Vue.component('app-update-user-dialogue', updateUserPassword)
Vue.component('app-subscriber', Subscriber)
Vue.component('app-delete-event-dialog', DeleteEventDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAl88Ba1yzhJjQ9AgA-Yzlo9V58vKWVAi4',
      authDomain: 'ara-food.firebaseapp.com',
      databaseURL: 'https://ara-food.firebaseio.com',
      projectId: 'ara-food',
      storageBucket: ''
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // rajouter les infos de users ds firebase
        this.$store.dispatch('autoSignin', user)
      }
    })
    this.$store.dispatch('loadEvents')
  }
})
