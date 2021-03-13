import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/toy-app',
        name: 'Toy App',
        component: toyApp
    },
    {
        path: '/toy/details/:toyId',
        name: 'Toy Details',
        component: toyDetails
    },
    {
        path: '/toy/edit/:toyId?',
        name: 'Toy Edit',
        component: toyEdit

    }
]

const router = new VueRouter({
    routes
})

export default router