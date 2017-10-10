<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <h4 class="primaty--text">On mange où?</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2 mb-3>
        <v-chip color="primary" text-color="white" @click="setEvent" style="cursor: pointer;">La voie verte</v-chip>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
        <form @submit.prevent="onCreateEvent">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="title"
                label="Titre"
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
                label="Une image?"
                id="image-url"
                v-model="imageUrl">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
              <v-btn
                class="primary"
                :disabled="!formIsValid || loading"
                type="submit"
                :loading="loading">
                Créer
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
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
      return this.title !== '' && this.description !== ''
    },
    formatedDate () {
      const date = moment(this.date)
      const timeArray = this.time.split(':')
      date.hours(timeArray[0])
      date.minutes(timeArray[1])
      return date.format('YYYY-M-DD HH:mm')
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateEvent () {
      if (!this.formIsValid) {
        return
      }
      let img
      if (this.imageUrl === '') {
        img = 'https://firebasestorage.googleapis.com/v0/b/ara-food.appspot.com/o/Default%2Fplaceholder.jpg?alt=media&token=8bfe324b-c282-484c-bc87-9ee04c6dca92'
      } else {
        img = this.imageUrl
      }
      const eventData = {
        title: this.title,
        description: this.description,
        imageUrl: img,
        date: this.formatedDate
      }
      this.$store.dispatch('createEvent', eventData)
    },
    setEvent () {
      this.title = 'La voie verte'
      this.description = 'Qui vient chercher son repas à la voie verte ce midi?'
      this.imageUrl = 'http://www.voieverte.fr/wp-content/uploads/2016/05/VoieVerte-menu-semaine' + moment().week() + '.jpg'
    }
  },
  mounted () {
    const d = new Date()
    if (moment(d).hour() > 12) {
      this.allowedDates.min = new Date()
      this.allowedDates.min.setDate(this.allowedDates.min.getDate() + 1)
    } else {
      this.allowedDates.min = new Date()
    }
    this.allowedDates.max = d.setDate(d.getDate() + 30)
  }
}
</script>
