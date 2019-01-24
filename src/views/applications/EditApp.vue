<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Добавить новое приложение</div>
        <div class="card-body">
            <form @submit.prevent="editApp">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="app.name" type="text" class="form-control" id="" aria-describedby="" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">IP-адрес</label>
                    <input v-model="app.ip" type="text" class="form-control" id="" aria-describedby="" required placeholder="IP-адрес">
                </div>
                <div class="form-group">
                    <label for="">Тип приложения</label>
                    <select v-model="app.type" class="form-control" id="" required>
                        <option disabled selected>Тип приложения</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Парк</label>
                    <select v-model="app.park" class="form-control" id="" required>
                        <option disabled selected>Парк</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    class App {
        constructor(id) {
            this.id = id;
            this.name = id;
            this.type = id;
            this.park = id;
            this.ip = id;
        }
    }
    export default {
        name: "EditApp",
        data: () => {
            return {
                app: new App(),
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        mounted() {
            this.app = new App(this.id);
        }
    }
</script>

<style scoped>

</style>