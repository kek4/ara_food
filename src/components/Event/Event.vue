<template>
  <v-layout row>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center" xs12 md8 offset-md2>
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ event.title }}</h5>
            <v-spacer></v-spacer>
            <app-edit-event-dialogue v-if="userIsCreator" :event="event"></app-edit-event-dialogue>
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <v-layout row>
              <h6 class="primary--text">{{ event.date | date}}</h6>
              <v-spacer></v-spacer>
              <app-edit-date-dialogue v-if="userIsCreator" :event="event"></app-edit-date-dialogue>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-subheader>{{ event.description }}</v-subheader>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-subheader>Participants</v-subheader>
            <v-layout row wrap>
              <v-flex xs12>
                <v-list two-line>
                  <app-subscriber v-for="sub in event.subscribers" :sub="sub" :key="sub.id"></app-subscriber>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions v-if="userIsAuthenticated">
            <app-delete-event-dialog v-if="userIsCreator" :eventId="event.id" title="Supprimer"></app-delete-event-dialog>
            <v-spacer></v-spacer>
            <app-event-subscribe-dialogue :eventId="event.id"></app-event-subscribe-dialogue>
            <app-event-subscribe-comment-dialogue :eventId="event.id"></app-event-subscribe-comment-dialogue>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      event () {
        return this.$store.getters.loadedEvent(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        } else {
          return this.$store.getters.user.id === this.event.creatorId
        }
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .container {
    min-height: 70vh !important;
  }
</style>
