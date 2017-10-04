<template>
  <v-app>
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
          <v-icon left>exit_to_app</v-icon>
          Admin
        </v-btn>
        <v-btn flat
              v-if="userIsAuthenticated"
              @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
        Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer>
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
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'View events', link: '/events'},
            {icon: 'room', title: 'Organize event', link: '/events/new'},
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
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
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
