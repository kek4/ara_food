<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex  xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Username"
                      id="username"
                      v-model="username"
                      type="text"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    v-model="email"
                    type="email"
                    required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
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
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="phone"
                      label="Phone"
                      id="phone"
                      v-model="phone"
                      type="number">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-checkbox
                      label="Admin"
                      v-model="admin"
                      @click="checkboxToggle"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="avatar"
                      label="Avatar URL"
                      id="avatar"
                      v-model="avatar"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <img :src="avatar" height="150">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Créer
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      avatar: 'https://firebasestorage.googleapis.com/v0/b/ara-food.appspot.com/o/Default%2Favatar.jpg?alt=media&token=ae30717b-88ff-4d57-bf85-5d9fdcda3583',
      admin: 0
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Password do not match' : true
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone,
        avatar: this.avatar,
        admin: this.admin})
      this.username = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.phone = ''
      this.avatar = 'https://firebasestorage.googleapis.com/v0/b/ara-food.appspot.com/o/Default%2Favatar.jpg?alt=media&token=ae30717b-88ff-4d57-bf85-5d9fdcda3583'
      this.admin = 0
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    checkboxToggle () {
      this.admin = 1 - this.admin
    }
  }
}
</script>
