import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Alert from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', Alert)

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
  }
})
