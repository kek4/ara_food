<template>
  <v-dialog width="350" persistent v-model="editDialogue">
    <v-btn accent fab small accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="center-content">
              <h6>Modifier l'événement</h6>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                multi-line
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions class="center-content">
              <v-btn flat @click="editDialogue = false">Fermer</v-btn>
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
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['event'],
    data () {
      return {
        editDialogue: false,
        editedTitle: this.event.title,
        editedDescription: this.event.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' && this.editedDescription.trim() === '') {
          return
        }
        this.editDialogue = false
        this.$store.dispatch('updateEventData', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.event.id
        })
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
