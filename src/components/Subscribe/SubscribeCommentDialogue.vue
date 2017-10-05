<template>
  <v-dialog persistent v-model="subscribeDialogue">
    <v-btn accent slot="activator" v-if="userIsSubscribe">
      <v-icon>comment</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Modifier le commentaire</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="comment"
              label="Commentaire"
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
              <v-btn flat @click="subscribeDialogue = false">Fermer</v-btn>
              <v-btn flat
                     @click="onAgree"
                     :loading="loading"
                     :disabled="loading">
                Confirmer
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
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
      },
      loading () {
        return this.$store.getters.loading
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
