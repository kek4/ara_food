import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/Event/Events'
import Event from '@/components/Event/Event'
import CreateEvent from '@/components/Event/CreateEvent'
import Profile from '@/components/User/Profile'
import Admin from '@/components/Admin/Admin'
import ManageEvent from '@/components/Admin/ManageEvent'
import ManageUser from '@/components/Admin/ManageUser'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/events/new',
      name: 'CreateEvent',
      component: CreateEvent,
      beforeEnter: AuthGuard
    },
    {
      path: '/events/:id',
      name: 'Event',
      props: true,
      component: Event
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/manageEvent',
      name: 'ManageEvent',
      component: ManageEvent,
      beforeEnter: AuthGuard
    },
    {
      path: '/manageUser',
      name: 'ManageUser',
      component: ManageUser,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
