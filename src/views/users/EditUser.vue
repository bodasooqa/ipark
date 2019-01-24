<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить пользователя</div>
        <div class="card-body">
            <form @submit.prevent="editUser">
                <div class="form-group">
                    <label for="">ФИО</label>
                    <input v-model="user.name" type="text" class="form-control" id="" aria-describedby="" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">Пароль</label>
                    <input v-model="user.password" type="password" class="form-control" id="" aria-describedby="" required placeholder="Пароль">
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
        constructor(id) {
            this.id = id;
            this.name = id;
            this.username = id;
            this.available = id;
        }
    }
    export default {
        name: "EditUser",
        data: () => {
            return {
                user: new User(),
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        mounted() {
            this.user = new User(this.id);
        }
    }
</script>

<style scoped>

</style>