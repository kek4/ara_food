<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primaty--text">Create new event</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateEvent">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="dateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-left="40"
                max-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Quelle date?"
                  v-model="date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date"
                               no-title
                               scrollable
                               actions
                               autosave
                               locale="fr-FR"
                               :allowed-dates="allowedDates">
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="timeMenu"
                transition="scale-transition"
                offset-y
                :nudge-left="40"
              >
                <v-text-field
                  slot="activator"
                  label="Quelle heure?"
                  v-model="time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="time" autosave format="24hr"></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"
              >Create</v-btn>
            </v-flex>
          </v-layout>
          {{ formatedDate }}
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

const today = moment().format('YYYY-M-DD')
export default {
  data () {
    return {
      title: '',
      description: '',
      imageUrl: '',
      time: '12:00',
      timeMenu: false,
      date: today,
      dateMenu: false,
      allowedDates: {
        min: null,
        max: null
      }
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.description !== '' && this.imageUrl !== ''
    },
    formatedDate () {
      const date = moment(this.date)
      const timeArray = this.time.split(':')
      date.hours(timeArray[0])
      date.minutes(timeArray[1])
      return date.format('YYYY-M-DD HH:mm')
    }
  },
  methods: {
    onCreateEvent () {
      if (!this.formIsValid) {
        return
      }
      const eventData = {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        date: this.formatedDate
      }
      this.$store.dispatch('createEvent', eventData)
    }
  },
  mounted () {
    const d = new Date()
    this.allowedDates.min = new Date()
    this.allowedDates.max = d.setDate(d.getDate() + 30)
  }
}
</script>
