<template>
  <v-app>
    <v-snackbar
      top
      @dismissed="onDismissed"
      v-model="toaster">
      {{ toaster }}
      <v-btn flat class="pink--text" @click.native="onDismissed">Close</v-btn>
    </v-snackbar>
    <v-toolbar dark class="primary">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Ara Food</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat
               v-if="userIsAdmin"
               to="/admin">
          <v-icon left>lock_outline</v-icon>
          Admin
        </v-btn>
        <v-btn flat
              v-if="userIsAuthenticated"
              @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
        Se déconnecter
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container class="pb-4">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer fixed dark class="primary">
      <div>J&R</div>
      <v-spacer></v-spacer>
      <div>2017</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'lock_open', title: 'Se connecter', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'restaurant', title: 'Voir les événements', link: '/events'},
            {icon: 'local_dining', title: 'Créer un événement', link: '/events/new'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsAdmin () {
        if (this.userIsAuthenticated) {
          return this.$store.getters.user.admin === 1
        }
      },
      toaster () {
        return this.$store.getters.toaster
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      },
      onDismissed () {
        this.$store.dispatch('clearToaster')
      }
    },
    watch: {
      userIsAuthenticated (value) {
        if (value === false) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
<style scoped>
  .container {
    min-height: 70vh !important;
  }
</style>
