<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить аттракцион</div>
        <div class="card-body">
            <form @submit.prevent="saveAttr(attr)">
                <div class="form-group">
                    <label for="">Устройство</label>
                    <select @change="setDevice($event.target.value)" :value="attr.atrDevice.atrDeviceObjid" class="form-control" required>
                        <option disabled selected>Устройство</option>
                        <option v-for="device in devices" :value="device.atrDeviceObjid" :key="device.parkId">{{device.atrDeviceDevAddress}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Режим</label>
                    <input v-model="attr.atrCode" type="text" class="form-control" required placeholder="Режим">
                </div>
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="attr.atrName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">Форматирование</label>
                    <textarea v-model="attr.atrFormatname" type="text" class="form-control" required placeholder="Форматирование"></textarea>
                </div>
                <div class="form-group">
                    <label for="">Таймаут сообщение (мс)</label>
                    <input v-model="attr.atrMsgtime" type="text" class="form-control" required placeholder="Таймаут сообщения (мс)">
                </div>
                <div class="form-group">
                    <label for="">Таймаут Green (мс)</label>
                    <input v-model="attr.atrGreentime" type="text" class="form-control" required placeholder="Таймаут Green (мс)">
                </div>
                <div class="form-group">
                    <label for="">Таймаут Red (мс)</label>
                    <input v-model="attr.atrRedtime" type="text" class="form-control" required placeholder="Таймаут Red (мс)">
                </div>
                <div class="form-group">
                    <label for="">Таймаут Rele (мс)</label>
                    <input v-model="attr.atrReletime" type="text" class="form-control" required placeholder="Таймаут Rele (мс)">
                </div>
                <div class="form-group">
                    <label for="">Интервал проходов</label>
                    <input v-model="attr.atrReleinterval" type="text" class="form-control" required placeholder="Интервал проходов">
                </div>
                <div class="form-check my-3">
                    <input id="enabled" v-model="attr.atrEnabled" type="checkbox" class="form-check-input">
                    <label for="enabled" class="form-check-label">Активен</label>
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
        name: "EditAttr",
        computed: {
            ...mapGetters('attrsModule', ['notification', 'attr', 'devices']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('attrsModule', ['setAttrs', 'saveAttr', 'setDevices']),
            ...mapMutations('attrsModule', ['setAttr', 'setDevice'])
        },
        created() {
            this.setAttr(this.id);
            this.setDevices(this.attr.atrDevice.atrDeviceMainobjid);
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