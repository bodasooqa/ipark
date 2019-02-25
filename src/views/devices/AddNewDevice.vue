<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новое устройство</div>
        <div class="card-body">
            <form @submit.prevent="addDevice">
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
                    <select v-model="device.atrHostPark" class="form-control" required>
                        <option disabled selected>Парк</option>
                        <option v-for="park in parks" :value="park" :key="park.parkId">{{park.parkName}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AddNewDevice",
        data() {
            return {
                device: {
                    atrHostName: null,
                    atrHostIpaddress: null,
                    atrHostPark: null,
                }
            }
        },
        computed: {
            ...mapGetters('devicesModule', ['parks'])
        },
        methods: {
            ...mapActions('devicesModule', ['saveDevice', 'setParks']),

            addDevice() {
                this.saveDevice(this.device);
                this.$router.go(-1);
            }
        },
        created() {
            this.setParks();
        }
    }
</script>

<style scoped>

</style>