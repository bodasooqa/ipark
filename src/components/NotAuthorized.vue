<template>
    <div class="bg-dark login-page">
        <div class="card login-form">
            <div class="card-body">
                <form @submit.prevent="sendForm">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input v-model="username" type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <button :disabled="!(username && password)" type="submit" class="btn btn-primary">Submit <i class="fas fa-sign-out-alt"></i></button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "NotAuthorized",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        computed: {
            ...mapGetters('authModule', ['token'])
        },
        methods: {
            ...mapActions('authModule', ['setToken']),
            sendForm() {
                this.setToken({username: this.username, password: this.password});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-page {
        display: flex;
        height: 100vh;
        .login-form {
            width: 400px;
            margin: auto;
        }
    }
</style>