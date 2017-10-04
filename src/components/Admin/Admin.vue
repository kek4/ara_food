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

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card dark class="secondary">
            <v-card-text>
              <v-list dense>
                <v-subheader class="mt-3 grey--text text--darken-1">Dernières actions</v-subheader>
                <v-list>
                  <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
                    <v-list-tile-avatar>
                      <img :src="`https://randomuser.me/api/portraits/lego/${item.picture}.jpg`" alt="">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.text"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.date"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card dark class="secondary">
            <v-card-text>
              <v-list>
                <v-subheader class="mt-3 grey--text text--darken-1">Evenements recents</v-subheader>
                <v-list >
                  <v-list-tile v-for="event in events" :key="event.id" avatar @click="">
                    <v-list-tile-avatar >
                      <img :src="event.imageUrl" alt="" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title> {{ event.title }} </v-list-tile-title>
                      <v-list-tile-sub-title> {{ event.date }} </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                     <v-list-tile-action-text>{{ event.subscribers.length }} participants</v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      items2: [
        { picture: 1, text: 'Joseph participe à tel evenement', date: 'il y à 10 minutes' },
        { picture: 2, text: 'Apple à créé un nouveau évenement', date: 'Il y à 20 minutes' },
        { picture: 3, text: 'Xbox à laissé un commentaire sur tel evenement', date: 'il y a 23 minutes' }
      ]
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
            {icon: 'person', title: 'Profile', link: '/profile'},
            {icon: 'face', title: 'Sign up', link: '/signup'}
        ]
        return menuItems
      }
    }
  }
</script>
