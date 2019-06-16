<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Графики</div>
        <div class="card-body">
            <button @click="$router.push('graphs/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>

            <download-excel class="d-inline-block" :data="excelData">
                <button class="btn btn-primary mr-2 mb-3">Экспорт</button>
            </download-excel>

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
                    <tr v-for="graph in graphs" :key="graph.graphObjid">
                        <td>{{graph.graphName}}</td>
                        <td>{{graph.graphPriority}}</td>
                        <td>{{graph.graphType.graphTypeName}}</td>
                        <td>{{graph.graphPark.parkName}}</td>
                        <td class="text-center">
                            <button @click="editGraph(graph.graphObjid)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(graph.graphObjid)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
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
                            <p>Действительно удалить {{currentGraph}}?</p>
                        </div>
                        <div class="modal-footer">
                            <button @click="removeGraph(currentGraph)" type="button" class="btn btn-success">Удалить</button>
                            <button @click="modalState = false" type="button" class="btn btn-danger">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="modalState" class="modal-backdrop fade show"></div>
        </transition>

        <transition name="fade">
            <div v-if="this.notification.state" class="alert alert-success" role="alert">{{notification.message}}</div>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Graphlications",
        data: () => {
            return {
                theads: [
                    { name: 'Наименование', type: 'compareString', param: 'name' },
                    { name: 'Приоритет', type: 'compareString', param: 'type' },
                    { name: 'Тип', type: 'compareString', param: 'park' },
                    { name: 'Парк', type: 'compareString', param: 'ip' },
                    { name: 'Действия' },
                ],
                modalState: false,
                currentGraph: null,
                sortParam: null
            }
        },
        computed: {
            ...mapGetters('graphsModule', ['graphs', 'notification', 'excelData']),
        },
        methods: {
            ...mapActions('graphsModule', ['setGraphs', 'deleteGraph']),
            editGraph(id) {
                this.$router.push(`/graphs/edit/${id}`);
            },
            removeGraph(id) {
                this.deleteGraph(id);
                this.modalState = false;
                this.setGraphs();
            },
            showModal(id) {
                this.currentGraph = id;
                this.modalState = true;
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.graphs.reverse();
                } else {
                    this.sortParam = prop;
                    this.graphs.sort(this[type]);
                }
            },
            compareString(a, b) {
                if(a[this.sortParam] < b[this.sortParam]) return -1;
                if(a[this.sortParam] > b[this.sortParam]) return 1;
                return 0;
            }
        },
        async mounted() {
            this.setGraphs();
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

    .card {
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
    }
</style>
