<template>
  <v-dialog width="350" persistent v-model="passwordDialogue">
    <v-btn class="ml-0 mb-3" small accent slot="activator" @click="openModal">
      <span class="pr-2">Changer le mot de passe</span>
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row v-if="error">
          <v-flex  xs12>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <v-card-title>Modifier le mot de passe</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="password"
              label="Mot de passe"
              id="password"
              v-model="password"
              type="password"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="newPassword"
              label="Nouveau mot de passe"
              id="newPassword"
              v-model="newPassword"
              type="password"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              name="confirmPassword"
              label="Confirmer le mot de passe"
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              :rules="[comparePasswords]">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat @click="closeModal">Fermer</v-btn>
              <v-btn flat :disabled="loading" :loading="loading" @click="onSaveChanges">
                Modifier
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
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
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.newPassword !== this.confirmPassword ? 'Les mots de passe ne correspondent pas' : true
      },
      passwordDialogue () {
        return this.$store.getters.modal
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSaveChanges () {
        this.$store.dispatch('updateUserPassword', {
          password: this.password,
          newPassword: this.newPassword
        })
      },
      closeModal () {
        this.$store.dispatch('setModal', false)
      },
      openModal () {
        this.$store.dispatch('setModal', true)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
