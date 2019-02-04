<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить приложение</div>
        <div class="card-body">
            <form @submit.prevent="saveApp(app)">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="app.appName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">IP-адрес</label>
                    <input v-model="app.appIpAddress" type="text" class="form-control" required placeholder="IP-адрес">
                </div>
                <div class="form-group">
                    <label for="">Тип приложения</label>
                    <select v-model="app.appType.appTypeId" class="form-control" required>
                        <option disabled selected>Тип приложения</option>
                        <option v-for="type in types" :value="type.appTypeId" :key="type.appTypeId">{{type.appTypeDescription}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Парк</label>
                    <select v-model="app.appPark.parkId" class="form-control" required>
                        <option disabled selected>Парк</option>
                        <option v-for="park in parks" :value="park.parkId" :key="park.parkId">{{park.parkName}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Сохранить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Назад</button>
            </form>
        </div>
        <transition name="fade">
            <div v-if="this.notification.state" class="alert alert-success" role="alert">{{notification.message}}</div>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditApp",
        computed: {
            ...mapGetters(['parks', 'types']),
            ...mapGetters('appModule', ['notification', 'apps', 'app', 'parks', 'types']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('appModule', ['setApps', 'saveApp', 'setTypes', 'setParks']),
            ...mapMutations('appModule', ['setApp']),
        },
        created() {
            if (!this.$store.state.apps) {
                this.setApps();
            }
            if (!this.$store.state.parks) {
                this.setParks();
            }
            if (!this.$store.types) {
                this.setTypes();
            }
            this.setApp(this.id);
        }
    }
</script>

<style lang="scss" scoped>
    .alert {
        position: absolute;
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>