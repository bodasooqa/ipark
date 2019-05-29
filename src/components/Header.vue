<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">

        <button @click="toggle" class="btn btn-link btn-sm text-white order-1 order-sm-0">
            <i class="fas fa-bars"></i>
        </button>

        <router-link class="navbar-brand mr-1" to="/">iPark</router-link>

        <!-- Navbar Search -->
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        </form>

        <!-- Navbar -->
        <ul class="navbar-nav ml-auto ml-md-0">
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user-circle fa-fw"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">Settings</a>
                    <a class="dropdown-item" href="#">Activity Log</a>
                    <div class="dropdown-divider"></div>
                    <a @click="setToken('')" class="dropdown-item pointer">Logout</a>
                </div>
            </li>
        </ul>

    </nav>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        methods: {
            ...mapMutations(['toggle']),
            ...mapMutations('authModule', ['setToken'])
        },
        name: "Header"
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variables";
    @import "../assets/scss/mixins";


</style>