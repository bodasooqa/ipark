<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить устройство</div>
        <div class="card-body">
            <form @submit.prevent="saveDevice(device)">
                <input type="hidden" v-model="device.atrHostObjid">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="device.atrHostName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">IP-адрес</label>
                    <input v-model="device.atrHostIpaddress" type="text" class="form-control" required placeholder="IP-адрес">
                </div>
                <div class="form-group">
                    <label for="">Парк</label>
                    <select v-model="device.atrHostPark.parkId" class="form-control" required>
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
        name: "EditDevice",
        computed: {
            ...mapGetters('devicesModule', ['notification', 'devices', 'device', 'parks', 'deviceAddresses']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('devicesModule', ['setDevices', 'saveDevice', 'setTypes', 'setParks', 'setDeviceAddresses']),
            ...mapMutations('devicesModule', ['setDevice']),
        },
        created() {
            this.setDevices();
            this.setParks();
            this.setDevice(this.id);
            this.setDeviceAddresses({atrDeviceMainobjid: this.id});
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