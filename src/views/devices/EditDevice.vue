<template>
    <div class="edit-device">
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить устройство</div>
            <div class="card-body">
                <form @submit.prevent="saveDevice(device); $router.go(-1)">
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
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-tasks mr-2"></i>Настройка устройства</div>
            <div class="card-body">
                <button @click="addNewAddressDevice" class="btn btn-success mr-2 mb-3">Добавить</button>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>Адрес</th>
                            <th>Кол-во режимов</th>
                            <th>Макс. кол-во проходов</th>
                            <th>Таймаут сна (мин)</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(address, i) in deviceAddresses" :key="i">
                            <td>{{address.atrDeviceDevAddress}}</td>
                            <td>{{address.atrDeviceCntMode}}</td>
                            <td>{{address.atrDeviceCntMaxEntrance}}</td>
                            <td>{{address.atrDeviceTimeout}}</td>
                            <td class="text-center">
                                <button @click="editDeviceAddress(address.atrDeviceObjid)" class="btn btn-sm btn-primary mr-1">
                                    <i class="fas fa-pen"></i>
                                </button>
                                <button @click="showModal(address.atrDeviceObjid)" class="btn btn-sm btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <transition name="fade">
                <div v-if="modalState" class="modal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Удаление</h5>
                            </div>
                            <div class="modal-body">
                                <p>Действительно удалить {{currentDeviceAddress}}?</p>
                            </div>
                            <div class="modal-footer">
                                <button @click="removeDeviceAddress()" type="button" class="btn btn-success">Удалить</button>
                                <button @click="modalState = false" type="button" class="btn btn-danger">Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <div v-if="modalState" class="modal-backdrop fade show"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditDevice",
        data() {
            return {
                modalState: false,
                currentDeviceAddress: null
            }
        },
        computed: {
            ...mapGetters('devicesModule', ['notification', 'devices', 'device', 'parks', 'deviceAddresses']),
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('devicesModule', ['setDevices', 'saveDevice', 'setTypes', 'setParks', 'setDeviceAddresses', 'deleteDeviceAddress']),
            ...mapMutations('devicesModule', ['setDevice']),
            editDeviceAddress(id) {
                this.$router.push({
                    name: 'edit-address-device',
                    params: {
                        'id': this.id,
                        'device-address-id': id
                    }
                });
            },
            addNewAddressDevice() {
                this.$router.push(`/devices/edit/${this.id}/device-address/add-new`);
            },
            showModal(id) {
                this.currentDeviceAddress = id;
                this.modalState = true;
            },
            removeDeviceAddress() {
                this.deleteDeviceAddress(this.currentDeviceAddress);
                this.modalState = false;
            }
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
    .modal {
        display: block;
    }

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
