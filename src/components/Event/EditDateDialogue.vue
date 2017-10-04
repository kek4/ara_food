<template>
  <v-dialog width="650" persistent v-model="editDialogue">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex md12 lg8 class="hidden-xs-only">
            <v-date-picker v-model="editedDate" landscape></v-date-picker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md12 lg8 class="hidden-xs-only">
            <v-time-picker v-model="editedTime" landscape format="24hr"></v-time-picker>
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
import moment from 'moment'
export default {
  props: ['event'],
  data () {
    return {
      editDialogue: false,
      editedDate: null,
      editedTime: null
    }
  },
  computed: {
    formatedDate () {
      const date = moment(this.editedDate)
      console.log(date)
      const timeArray = this.editedTime.split(':')
      date.hours(timeArray[0])
      date.minutes(timeArray[1])
      return date.format('YYYY-M-DD HH:mm')
    }
  },
  methods: {
    onSaveChanges () {
      this.editDialogue = false
      this.$store.dispatch('updateDateEvent', {
        date: this.formatedDate,
        id: this.event.id
      })
    }
  },
  created () {
    const date = this.event.date.split(' ')
    this.editedDate = date[0]
    this.editedTime = date[1]
  }
}
</script>
