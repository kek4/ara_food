<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ event.title }}</h6>
            <v-spacer></v-spacer>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-date-dialogue :event="event"></app-edit-date-dialogue>
              <app-edit-event-dialogue :event="event"></app-edit-event-dialogue>
              <app-delete-event-dialog :eventId="event.id" title=""></app-delete-event-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ event.date | date}}</div>
            <div>{{ event.description }}</div>
            <v-divider></v-divider>
            <v-subheader>Subscribers</v-subheader>
            <v-layout row wrap>
              <v-flex xs12>
                <v-list two-line>
                  <app-subscriber v-for="sub in event.subscribers" :sub="sub" :key="sub.id"></app-subscriber>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions v-if="userIsAuthenticated">
            <v-spacer></v-spacer>
            <app-event-subscribe-dialogue :eventId="event.id"></app-event-subscribe-dialogue>
            <app-event-subscribe-comment-dialogue :eventId="event.id"></app-event-subscribe-comment-dialogue>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
