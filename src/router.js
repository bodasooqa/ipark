import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Applications from "./views/applications/Applications";
import AddNewApp from "./views/applications/AddNewApp";
import EditApp from "./views/applications/EditApp";
import Users from "./views/users/Users";
import EditUser from "./views/users/EditUser";
import AddNewUser from "./views/users/AddNewUser";
import Attractions from "./views/attractions/Attractions";
import AddNewAttr from "./views/attractions/AddNewAttr";
import EditAttr from "./views/attractions/EditAttr";

Vue.use(Router);

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
            path: '/applications',
            name: 'applications',
            component: Applications
        },
        {
            path: '/applications/add-new',
            name: 'add-new-app',
            component: AddNewApp
        },
        {
            path: '/applications/edit/:id',
            name: 'edit-app',
            component: EditApp
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '/users/add-new',
            name: 'add-new-user',
            component: AddNewUser
        },
        {
            path: '/users/edit/:id',
            name: 'edit-user',
            component: EditUser
        },
        {
            path: '/attractions',
            name: 'attractions',
            component: Attractions
        },
        {
            path: '/attractions/add-new',
            name: 'add-new-attr',
            component: AddNewAttr
        },
        {
            path: '/attractions/edit/:id',
            name: 'edit-attr',
            component: EditAttr
        },
    ]
});
