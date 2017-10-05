<template>
  <v-dialog persistent v-model="subscribeDialogue">
    <v-btn accent slot="activator">
      {{ userIsSubscribe ? 'Ne plus participer' : 'Participer'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsSubscribe">Ne plus participer</v-card-title>
            <v-card-title v-else>Participer</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap v-if="!userIsSubscribe">
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
        if (this.userIsSubscribe) {
          this.$store.dispatch('unSubscribeUserForEvent', {
            id: this.eventId
          })
        } else {
          this.$store.dispatch('subscribeUserForEvent', {
            id: this.eventId,
            comment: this.comment
          })
        }
      }
    }
  }
</script>
