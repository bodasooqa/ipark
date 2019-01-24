<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новое приложение</div>
        <div class="card-body">
            <form @submit.prevent="addNew">
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
        constructor(name, ip, type, park) {
            this.ip = ip;
            this.name = name;
            this.type = type;
            this.park = park;
        }
    }

    export default {
        name: "AddNewApp",
        data: () => {
            return {
                app: new App()
            }
        },
        methods: {
            addNew() {
                console.log(this.app);
                this.app = new App();
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>