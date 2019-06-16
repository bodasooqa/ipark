<template>
    <div id="edit-graph">
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить график</div>
            <div class="card-body">
                <form @submit.prevent="saveGraph(graph); $router.go(-1)">
                    <div class="form-group">
                        <label for="">Наименование</label>
                        <input v-model="graph.graphName" type="text" class="form-control" required placeholder="Наименование">
                    </div>
                    <div class="form-group">
                        <label for="">Приоритет</label>
                        <input v-model="graph.graphPriority" type="text" class="form-control" required placeholder="IP-адрес">
                    </div>
                    <div class="form-group">
                        <label for="">Тип графика</label>
                        <select v-model="graph.graphType.graphTypeId" class="form-control" required>
                            <option disabled selected>Тип приложения</option>
                            <option v-for="type in types" :value="type.graphTypeId" :key="type.graphTypeId">{{type.graphTypeName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Парк</label>
                        <select v-model="graph.graphPark.parkId" class="form-control" required>
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
            <div class="card-header"><i class="fas fa-tasks mr-2"></i>Настройка графика</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>Дата начала</th>
                            <th>Дата окончания</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, i) in graphSettings" :key="i">
                            <td><datetime input-class="form-control pointer" type="datetime" :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                                          value-zone="UTC+3" format="dd.MM.yyyy HH:mm" v-model="item.graphSettingsStartdt"></datetime></td>
                            <td><datetime input-class="form-control pointer" type="datetime" :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                                          value-zone="UTC+3" format="dd.MM.yyyy HH:mm" v-model="item.graphSettingsEnddt"></datetime></td>
                            <td class="text-center">
                                <button @click="saveGraphSetting(item)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-save"></i></button>
                                <button @click="deleteGraphSetting(item)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr v-if="newSettingState">
                            <td><datetime input-class="form-control pointer" type="datetime" :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                                          value-zone="UTC+3" format="dd.MM.yyyy HH:mm" v-model="newSetting.graphSettingsStartdt"></datetime></td>
                            <td><datetime input-class="form-control pointer" type="datetime" :phrases="{ok: 'Ок', cancel: 'Отмена'}"
                                          value-zone="UTC+3" format="dd.MM.yyyy HH:mm" v-model="newSetting.graphSettingsEnddt"></datetime></td>
                            <td class="text-center">
                                <button @click="saveNewSetting(newSetting)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-save"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <button @click="newSettingState = true" class="btn btn-block btn-sm btn-success"><i class="fas fa-plus"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import { Datetime } from 'vue-datetime';

    export default {
        name: "EditGraph",
        components: {
            datetime: Datetime
        },
        data() {
            return {
                newSettingState: false,
                newSetting: {
                    graphSettingsStartdt: null,
                    graphSettingsEnddt: null,
                    graphSettingsMainobjid: null
                }
            }
        },
        computed: {
            ...mapGetters('graphsModule', ['notification', 'graphs', 'graph', 'parks', 'types', 'graphSettings']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('graphsModule', ['setGraphs', 'saveGraph', 'setParks', 'setTypes', 'setGraphSettings', 'saveGraphSetting', 'deleteGraphSetting']),
            ...mapMutations('graphsModule', ['setGraph']),
            saveNewSetting(setting) {
                setting.graphSettingsMainobjid = this.id;
                this.saveGraphSetting(setting);
            }
        },
        created() {
            this.setGraphs();
            this.setParks();
            this.setTypes();
            this.setGraph(this.id);
            this.setGraphSettings(this.id);
        }
    }
</script>

<style lang="scss">
    .pointer {
        cursor: pointer;
    }

    .alert {
        position: absolute !important;
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
