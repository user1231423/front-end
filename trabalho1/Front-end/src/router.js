import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'

import Profile from './components/Profile/profile'
//import Post from './components/Post/post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
