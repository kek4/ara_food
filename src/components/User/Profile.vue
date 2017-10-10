<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <h4 class="primaty--text">Edition du profile</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <h5 class="primaty--text">{{ username }}</h5>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <span class="subheader">Changer le mot de passe</span>
        <app-update-user-dialogue></app-update-user-dialogue>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <v-text-field
          name="phone"
          label="Telephone"
          id="phone"
          v-model="editedPhone"
          type="text">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <v-text-field
          name="avatar"
          label="Avatar"
          id="image-avatar"
          v-model="editedAvatar"
          ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <img :src="editedAvatar" height="150">
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card-actions>
          <v-btn flat
                 @click="onSaveChanges"
                 :loading="loading"
                 :disabled="loading">
            Modifier
            <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      editedAvatar: this.$store.getters.user.avatar,
      editedPhone: this.$store.getters.user.phone,
      username: this.$store.getters.user.username
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSaveChanges () {
      this.$store.dispatch('updateProfileData', {
        password: this.password,
        phone: this.editedPhone,
        avatar: this.editedAvatar
      })
    }
  }
}
</script>
