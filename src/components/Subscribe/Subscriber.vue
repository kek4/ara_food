<template>
  <v-list-tile avatar>
    <v-tooltip top>
      <v-list-tile-avatar slot="activator">
        <img :src="subscriber.avatar">
      </v-list-tile-avatar>
      <span>
        <div>
          Contact
          <v-divider dark></v-divider>
        </div>
        <div>
          Tel: {{ subscriber.phone }}
        </div>
        <div>
          Email: {{ subscriber.email }}
        </div>
      </span>
    </v-tooltip>
    <v-list-tile-content>
      <v-list-tile-title>{{ subscriber.username }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ sub.comment }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    props: ['sub'],
    data () {
      return {
        subscriber: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      firebase.database().ref('/users/' + this.sub.id)
        .once('value')
        .then((data) => {
          this.subscriber = data.val()
        })
    }
  }
</script>
