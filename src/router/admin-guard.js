import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    if (store.getters.user.admin === 1) {
      next()
    } else {
      next('/')
    }
  } else {
    next('/signIn')
  }
}
