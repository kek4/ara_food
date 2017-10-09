<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="text-xs-center">Evenements à venir !</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
        indeterminate
        class="primary--text"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2 carousel-height" v-if="!loading">
      <v-flex xs12 md8 offset-md2>
        <v-carousel hide-controls style="cursor: pointer;">
          <v-carousel-item
            v-for="event in events"
            :src="event.imageUrl"
            :key="event.id"
            @click="onLoadEvent(event.id)"
            class="carousel-item secondary">
            <v-chip class="text-xs-center carousel-title" color="primary" text-color="white">
              {{ event.title }}
            </v-chip>
            <v-chip class="primary white--text text-xs-right carousel-sub">
              {{ event.subscribers.length }}
              <v-icon right>assignment_ind</v-icon>
            </v-chip>
            <v-chip class="text-xs-center carousel-date" color="primary" text-color="white">
              {{ event.date | date }}
            </v-chip>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      events () {
        return this.$store.getters.eventToCome
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadEvent (id) {
        this.$router.push('/events/' + id)
      }
    }
  }
</script>

<style scoped>
  .carousel-date {
    position: absolute;
    bottom: 2%;
    font-size: 2em;
    padding: 20px;
  }
  .carousel-sub {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 2em;
    padding: 20px;
  }
  .carousel-title {
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: 2em;
    padding: 20px;
  }
  .carousel__item {
    height: 100%;
    background-size: contain;
  }
  .carousel {
    height: 100%;
  }
  .carousel-height {
    height: 70vh !important;
  }
  .container {
    min-height: 70vh !important;
  }
</style>
