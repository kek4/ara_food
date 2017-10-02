<template>
  <v-dialog persistent v-model="subscribeDialogue">
    <v-btn accent slot="activator" v-if="userIsSubscribe">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit your comment</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="comment"
              label="Comment"
              id="comment"
              v-model="comment"
              multi-line
              required></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat @click="subscribeDialogue = false">Close</v-btn>
              <v-btn flat @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    props: ['eventId'],
    data () {
      return {
        subscribeDialogue: false,
        comment: ''
      }
    },
    computed: {
      userIsSubscribe () {
        // a changer !!
        return this.$store.getters.loadedEvent(this.eventId).subscribers.find(event => {
          return event.id === this.$store.getters.user.id
        }) !== undefined
      }
    },
    methods: {
      onAgree () {
        this.$store.dispatch('editComment', {
          id: this.eventId,
          comment: this.comment
        })
      }
    },
    created () {
      firebase.database().ref('/events/' + this.eventId)
      .child('/subscribers/' + this.$store.getters.user.id)
      .child('comment')
      .once('value')
      .then((data) => {
        this.comment = data.val()
      })
    }
  }
</script>
