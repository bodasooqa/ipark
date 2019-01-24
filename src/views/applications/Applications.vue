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
                    <tr v-for="app in apps" :key="app.ip">
                        <td>{{app.name}}</td>
                        <td>{{app.type}}</td>
                        <td>{{app.park}}</td>
                        <td>{{app.ip}}</td>
                        <td class="text-center">
                            <button @click="editApp(app.id)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(app.id)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>

        <transition name="fade-modal">
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
                            <button type="button" class="btn btn-success">Удалить</button>
                            <button @click="modalState = false" type="button" class="btn btn-danger">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div v-if="modalState" class="modal-backdrop fade show"></div>

    </div>
</template>

<script>
    export default {
        name: "Applications",
        data: () => {
            return {
                apps: [
                    {
                        id: '1',
                        name: 'Касса 3',
                        type: 'Касса',
                        park: 'park1',
                        ip: '192.168.0.5'
                    },
                    {
                        id: '2',
                        name: 'Касса 2',
                        type: 'Касса',
                        park: 'park1',
                        ip: '192.168.0.6'
                    },
                    {
                        id: '3',
                        name: 'Касса 4',
                        type: 'Касса',
                        park: 'park1',
                        ip: '192.168.0.8'
                    },
                    {
                        id: '4',
                        name: 'Касса 1',
                        type: 'Касса',
                        park: 'park1',
                        ip: '192.168.0.9'
                    },
                ],
                theads: [
                    {
                        name: 'Наименование',
                        type: 'compareString',
                        param: 'name'
                    },
                    {
                        name: 'Тип',
                        type: 'compareString',
                        param: 'type'
                    },
                    {
                        name: 'Парк',
                        type: 'compareString',
                        param: 'park'
                    },
                    {
                        name: 'IP-адрес',
                        type: 'compareString',
                        param: 'ip'
                    },
                    {
                        name: 'Действия'
                    },
                ],
                modalState: false,
                currentApp: null,
                sortParam: null
            }
        },
        methods: {
            editApp(id) {
                this.$router.push(`/applications/edit/${id}`);
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
        mounted() {
            this.sortData('name', 'compareString');
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

    .fade-modal-enter {
        opacity: 0;
    }

    .fade-modal-leave-active {
        opacity: 0;
    }

    .fade-modal-enter .fade-modal-container,
    .fade-modal-leave-active .fade-modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>