<template>
  <v-dialog persistent v-model="subscribeDialogue">
    <v-btn accent slot="activator" @click="test">
      {{ userIsSubscribe ? 'Unsub' : 'Sub'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsSubscribe">Unsub from event</v-card-title>
            <v-card-title v-else>Sub for event</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap v-if="!userIsSubscribe">
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
      },
      test () {
        let hop = this.$store.getters.loadedEvent(this.eventId).subscribers.find(event => {
          return event.id === this.$store.getters.user.id
        }) !== undefined
        console.log(hop)
      }
    }
  }
</script>
