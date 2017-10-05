<template>
  <v-dialog v-model="dialog" lazy absolute>
    <v-btn flat slot="activator">
      <v-icon left class="material-icons">delete</v-icon>
      {{ title }}
    </v-btn>
    <v-card>
      <v-card-title>
        <div class="headline">Attention</div>
      </v-card-title>
      <v-card-text>Etes-vous sûr de vouloir supprimer cet événement ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Non</v-btn>
        <v-btn class="green--text darken-1" flat="flat" @click.native="deleteEvent">Oui</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false
    }),
    props: ['eventId', 'title'],
    methods: {
      deleteEvent () {
        this.dialog = false
        this.$store.dispatch('deleteEvent', {
          id: this.eventId
        })
      }
    }
  }
</script>
