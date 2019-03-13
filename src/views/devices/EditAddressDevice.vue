<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить устройство</div>
        <div class="card-body">
            <form @submit.prevent="saveDeviceAddress(deviceAddress)">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="deviceAddress.atrDeviceDevAddress" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">Кол-во режимов (1-15)</label>
                    <input v-model="deviceAddress.atrDeviceCntMode" type="text" class="form-control" required placeholder="Кол-во режимов (1-15)">
                </div>
                <div class="form-group">
                    <label for="">Макс. кол-во проходов (1-6)</label>
                    <input v-model="deviceAddress.atrDeviceCntMaxEntrance" type="text" class="form-control" required placeholder="Макс. кол-во проходов (1-6)">
                </div>
                <div class="form-group">
                    <label for="">Таймаут сна (мин)</label>
                    <input v-model="deviceAddress.atrDeviceTimeout" type="text" class="form-control" required placeholder="Таймаут сна (мин)">
                </div>
                <div class="form-check my-3">
                    <input id="enabled" v-model="deviceAddress.atrDeviceIndicatEntrance" type="checkbox" class="form-check-input">
                    <label for="enabled" class="form-check-label">Индикация единичного прохода</label>
                </div>
                <div class="form-group">
                    <label for="">Яркость светодиодов (GBR, 0 мин, 5 макс)</label>
                    <input v-model="deviceAddress.atrDeviceLedBrightness" type="text" class="form-control" required placeholder="Яркость светодиодов (GBR, 0 мин, 5 макс)">
                </div>
                <div class="form-check my-3">
                    <input id="enabled2" v-model="deviceAddress.atrDeviceTypeRelay1" type="checkbox" class="form-check-input">
                    <label for="enabled2" class="form-check-label">Тип реле 1 (НЗ/НР)</label>
                </div>
                <div class="form-check my-3">
                    <input id="enabled3" v-model="deviceAddress.atrDeviceTypeRelay2" type="checkbox" class="form-check-input">
                    <label for="enabled3" class="form-check-label">Тип реле 2 (НЗ/НР)</label>
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
        name: "EditAddressDevice",
        computed: {
            ...mapGetters('devicesModule', ['notification', 'deviceAddress']),
            deviceAddressIp() {
                return this.$route.params['device-address-id'];
            }
        },
        methods: {
            ...mapMutations('devicesModule', ['setDeviceAddress']),
            ...mapActions('devicesModule', ['saveDeviceAddress'])
        },
        created() {
            this.setDeviceAddress(this.deviceAddressIp);
        }
    }
</script>

<style scoped>

</style>