<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ event.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ event.date }}</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid atque aut autem deserunt doloremque error, est exercitationem fugit impedit ipsum, iure molestiae nesciunt porro quo sapiente sed tempore voluptates?</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Subscribe</v-btn>
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
      }
    }
  }
</script>
