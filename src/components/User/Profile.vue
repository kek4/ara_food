<template>
  <v-container>
    <app-update-user-dialogue></app-update-user-dialogue>
    <v-layout row>
      <v-flex xs12>
        <v-text-field
          name="phone"
          label="Phone"
          id="phone"
          v-model="editedPhone"
          type="text">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-text-field
          name="avatar"
          label="Avatar"
          id="image-avatar"
          v-model="editedAvatar"
          required></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <img :src="editedAvatar" height="150">
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-actions>
          <v-btn flat @click="onSaveChanges">Save</v-btn>
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
      editedPhone: this.$store.getters.user.phone
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
