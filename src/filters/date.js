import moment from 'moment'
moment.locale('fr')

export default (value) => {
  const date = moment(value).format('dddd DD MMMM YYYY HH:mm')
  return date
}
