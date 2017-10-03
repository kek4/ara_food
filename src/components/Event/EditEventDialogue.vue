<template>
  <v-dialog width="350" persistent v-model="editDialogue">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Event</v-card-title>
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
            <v-card-actions>
              <v-btn flat @click="editDialogue = false">Close</v-btn>
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
    }
  }
</script>
