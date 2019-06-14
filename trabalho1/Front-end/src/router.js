import Vue from 'vue'
import Router from 'vue-router'

//Basic routes
import Home from './views/Home.vue'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'
import loggedHome from './views/loggedHome'

//Routes after user login
import Profile from './components/Profile/profile'
import Create from './components/Posts/create'
import showPosts from './components/Posts/show'
import chat from './components/Chat/chat'
import logout from './components/Auth/logout'
import search from './components/People/search'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'loggedHome',
            component: loggedHome
        },
        {
            path: '/users/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/users/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/posts/create',
            name: 'Create',
            component: Create
        },
        {
            path: '/posts/show',
            name: 'ShowPosts',
            component: showPosts
        },
        {
            path: '/chat',
            name: 'Chat',
            component: chat
        },
        {
            path: '/logout',
            name: 'Logout',
            component: logout
        },
        {
            path: '/search',
            name: 'Search',
            component: search
        }
    ]
})