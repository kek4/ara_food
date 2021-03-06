import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/Event/Events'
import Event from '@/components/Event/Event'
import CreateEvent from '@/components/Event/CreateEvent'
import Profil from '@/components/User/Profil'
import Admin from '@/components/Admin/Admin'
import ManageEvent from '@/components/Admin/ManageEvent'
import ManageUser from '@/components/Admin/ManageUser'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AuthGuard from './auth-guard'
import AdminGuard from './admin-guard'

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
      path: '/profil',
      name: 'Profil',
      component: Profil,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AdminGuard
    },
    {
      path: '/manageEvent',
      name: 'ManageEvent',
      component: ManageEvent,
      beforeEnter: AdminGuard
    },
    {
      path: '/manageUser',
      name: 'ManageUser',
      component: ManageUser,
      beforeEnter: AdminGuard
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
