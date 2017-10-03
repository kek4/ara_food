<template>
  <v-app dark id="e3" toolbar>
    <v-toolbar class="red darken-1" fixed>
      <v-toolbar-title class="white--text">Ara food</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Filter les résultats</div>
        <v-card class="grey darken-4">
          <v-card-text>
            <v-container fluid grid-list-md>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 sm4 offset-sm4>
                  <p>Par mois</p>
                  <v-select v-bind:items="dropdown_icon" label="Select" segmented class="grey darken-4"></v-select>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                  <v-btn
                    info
                    :loading="loading4"
                    @click.native="loader = 'loading4'"
                    :disabled="loading4"
                  >
                    Filter
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="info mb-2" v-for="event in events" :key="event.id">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                  :src="event.imageUrl"
                  height="130px">
                  </v-card-media>
                  </v-flex>
                  <v-flex xs7 sm8 md9>

                    <v-card-title primary-title>
                      <v-list-tile-content xs5>
                        <v-list-tile-title class="white--text mb-0"><h5>{{ event.title }}</h5></v-list-tile-title>
                        <v-list-tile-sub-title>{{ event.date }}</v-list-tile-sub-title>
                        
                      </v-list-tile-content>
                      <v-list-tile-content xs5>
                        <v-chip class="primary white--text text-xs-right">
                          {{ event.subscribers.length }}
                          <v-icon right>assignment_ind</v-icon>
                        </v-chip>
                      </v-list-tile-content>
                    </v-card-title>

                    <v-card-actions>
                      <v-btn flat :to="'/events/' + event.id">
                        <v-icon left>arrow_forward</v-icon>
                        Voir l'évenements
                      </v-btn>
                      <app-delete-event-dialog :eventId="event.id" title="yolo"></app-delete-event-dialog>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      dialog: false,
      dropdown_icon: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      loader: null,
      loading4: false
    }),
    computed: {
      events () {
        return this.$store.getters.loadedEvents
      },
      menuItems () {
        let menuItems = [
            {icon: 'dashboard', title: 'Accueil admin', link: '/admin'},
            {icon: 'event', title: 'Liste des évenements', link: '/manageEvent'},
            {icon: 'room', title: 'Liste utilisateurs', link: '/manageUser'},
            {icon: 'person', title: 'Profile', link: '/profile'}
        ]
        return menuItems
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>