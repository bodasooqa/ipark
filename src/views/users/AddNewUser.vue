<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить нового пользователя</div>
        <div class="card-body">
            <form @submit.prevent="addApp">
                <div class="form-group">
                    <label for="">ФИО</label>
                    <input v-model="user.userFio" type="text" class="form-control" required placeholder="ФИО">
                </div>
                <div class="form-group">
                    <label for="">Пользователь</label>
                    <input v-model="user.userName" type="text" class="form-control" required placeholder="Пользователь">
                </div>
                <div class="form-group">
                    <label for="">Пароль</label>
                    <input v-model="user.password" type="password" class="form-control" required placeholder="Пароль">
                </div>
                <div class="form-check mb-3">
                    <input v-model="user.userEnabled" type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="">Доступен</label>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Сохранить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    class User {
        constructor(fio, username, password, enabled) {
            this.userFio = fio;
            this.userName = username;
            this.password = password;
            this.userEnabled = enabled;
        }
    }

    export default {
        name: "AddNewUser",
        data() {
            return {
                user: new User()
            }
        },
        methods: {
            ...mapActions('usersModule', ['saveUser']),

            addApp() {
                this.saveUser(this.user);
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>