<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info mb-2" v-for="event in events" :key="event.id">
          <v-layout row>
            <v-flex xs5 sm4 md3>
              <v-chip class="accent sub">
                {{ event.subscribers.length }}
                <v-icon color="white" right>assignment_ind</v-icon>
              </v-chip>
              <v-card-media
              :src="event.imageUrl"
              height="100%">
              </v-card-media>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
                <div>
                  <h5 class="white--text mb-0">{{ event.title }}</h5>
                  <div>{{ event.date | date }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat :to="'/events/' + event.id">
                  <v-icon left>arrow_forward</v-icon>
                  Voir
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    events () {
      return this.$store.getters.eventToCome
    }
  }
}
</script>
<style scoped>
  .sub {
    position: absolute;
    top: 2%;
    z-index: 2;
  }
</style>
