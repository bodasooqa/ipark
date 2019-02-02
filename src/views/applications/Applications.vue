<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Приложения</div>
        <div class="card-body">
            <button @click="$router.push('applications/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>
            <button @click="exportAll" class="btn btn-primary mr-2 mb-3">Экспорт</button>

            <div class="table-responsive">
                <table class="table table-bordered table-hover table-striped" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                    <tr>
                        <th v-for="thead in theads" :key="thead.param">
                            <div class="align-items-center d-flex justify-content-between">
                                {{thead.name}}
                                <i v-if="thead.type" @click="sortData(thead.param, thead.type)" class="fas fa-sort"></i>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="app in apps" :key="app.appObjid">
                        <td>{{app.appName}}</td>
                        <td>{{app.appType.appTypeDescription}}</td>
                        <td>{{app.appPark.parkName}}</td>
                        <td>{{app.appIpAddress}}</td>
                        <td class="text-center">
                            <button @click="editApp(app.appObjid)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(app.appObjid)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--<div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>-->

        <transition name="fade">
            <div v-if="modalState" class="modal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Удаление</h5>
                        </div>
                        <div class="modal-body">
                            <p>Действительно удалить {{currentApp}}?</p>
                        </div>
                        <div class="modal-footer">
                            <button @click="deleteApp()" type="button" class="btn btn-success">Удалить</button>
                            <button @click="modalState = false" type="button" class="btn btn-danger">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div v-if="modalState" class="modal-backdrop fade show"></div>

        <transition name="fade">
            <div v-if="this.notificationState" class="alert alert-success" role="alert">Успешно удалено</div>
        </transition>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Applications",
        data: () => {
            return {
                theads: [
                    { name: 'Наименование', type: 'compareString', param: 'name' },
                    { name: 'Тип', type: 'compareString', param: 'type' },
                    { name: 'Парк', type: 'compareString', param: 'park' },
                    { name: 'IP-адрес', type: 'compareString', param: 'ip' },
                    { name: 'Действия' },
                ],
                modalState: false,
                currentApp: null,
                sortParam: null
            }
        },
        computed: {
            ...mapGetters(['apps', 'notificationState'])
        },
        methods: {
            editApp(id) {
                this.$router.push(`/applications/edit/${id}`);
            },
            deleteApp() {
                this.$store.dispatch('deleteApp', this.currentApp);
                this.modalState = false;
            },
            showModal(id) {
                this.currentApp = id;
                this.modalState = true;
            },
            exportAll() {
                console.log('exported');
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.apps.reverse();
                } else {
                    this.sortParam = prop;
                    this.apps.sort(this[type]);
                }
            },
            compareString(a, b) {
                if(a[this.sortParam] < b[this.sortParam]) return -1;
                if(a[this.sortParam] > b[this.sortParam]) return 1;
                return 0;
            }
        },
        async mounted() {
            this.$store.dispatch('setApps');
            // this.sortData('appName', 'compareString');
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        display: block;
    }
    .fa-sort {
        cursor: pointer;
    }

    .alert {
        position: absolute;
        width: 100%;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave-active {
        opacity: 0;
    }

    .fade-enter .fade-container,
    .fade-leave-active .fade-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>