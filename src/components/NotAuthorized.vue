<template>
    <div class="bg-dark login-page">
        <div v-if="notification" class="alert alert-danger position-absolute w-50" role="alert">
            <strong>Ошибка:</strong> Некорректные данные для входа. Попробуйте еще раз.
        </div>
        <div class="card login-form">
            <div class="card-body">
                <form @submit.prevent="sendForm">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Имя пользователя</label>
                        <input v-model="username" type="text" class="form-control" id="exampleInputEmail1" placeholder="Имя пользователя">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Пароль</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
                    </div>
                    <button :disabled="!(username && password)" type="submit" class="btn btn-primary">Отправить <i class="fas fa-sign-out-alt"></i></button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "NotAuthorized",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        computed: {
            ...mapGetters('authModule', ['token', 'notification'])
        },
        methods: {
            ...mapActions('authModule', ['setToken']),
            ...mapMutations('authModule', ['setNotification']),
            sendForm() {
                this.setToken({username: this.username, password: this.password});
            }
        },
        created() {
            this.setNotification(true);
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

    .alert {
        left: 0;
        right: 0;
        margin: auto;
        top: 1rem;
        color: #fff;
        background: rgba(255, 0, 27, 0.15);
    }
</style>