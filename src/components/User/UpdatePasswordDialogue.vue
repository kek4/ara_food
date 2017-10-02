<template>
  <v-dialog width="350" persistent v-model="passwordDialogue">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Update Password</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="password"
              type="password"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              :rules="[comparePasswords]">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat @click="passwordDialogue = false">Close</v-btn>
              <v-btn flat @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['event'],
    data () {
      return {
        passwordDialogue: false,
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Password do not match' : true
      }
    },
    methods: {
      onSaveChanges () {
        this.passwordDialogue = false
        this.$store.dispatch('updateUserPassword', {
          password: this.password
        })
      }
    }
  }
</script>
