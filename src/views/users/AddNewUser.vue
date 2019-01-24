<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить нового пользователя</div>
        <div class="card-body">
            <form @submit.prevent="addNew">
                <div class="form-group">
                    <label for="">ФИО</label>
                    <input v-model="user.name" type="text" class="form-control" id="" aria-describedby="" required placeholder="ФИО">
                </div>
                <div class="form-group">
                    <label for="">Пользователь</label>
                    <input v-model="user.username" type="text" class="form-control" id="" aria-describedby="" required placeholder="Пользователь">
                </div>
                <div class="form-group">
                    <label for="">Пароль</label>
                    <input v-model="user.password" type="text" class="form-control" id="" aria-describedby="" required placeholder="Пароль">
                </div>
                <div class="form-check">
                    <input v-model="user.available" type="checkbox" class="form-check-input" id="">
                    <label class="form-check-label" for="">Доступен</label>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    class User {
        constructor(name, username, password, available) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.available = available;
        }
    }

    export default {
        name: "AddNewUser",
        data: () => {
            return {
                user: new User()
            }
        },
        methods: {
            addNew() {
                console.log(this.user);
                this.user = new User();
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>