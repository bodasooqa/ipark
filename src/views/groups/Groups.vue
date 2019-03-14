<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Приложения</div>
        <div class="card-body">
            <button @click="$router.push('groups/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>

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
                    <tr v-for="group in groups" :key="group.groupObjid">
                        <td>{{group.groupName}}</td>
                        <td class="text-center">
                            <button @click="editGroup(group.groupObjid)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(group.groupObjid)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
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
                            <p>Действительно удалить {{currentGroup}}?</p>
                        </div>
                        <div class="modal-footer">
                            <button @click="removeGroup(currentGroup)" type="button" class="btn btn-success">Удалить</button>
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
        name: "Groups",
        data: () => {
            return {
                theads: [
                    { name: 'Наименование', type: 'compareString', param: 'name' },
                    { name: 'Действия' },
                ],
                modalState: false,
                currentGroup: null,
                sortParam: null
            }
        },
        computed: {
            ...mapGetters('groupsModule', ['groups', 'notification']),
        },
        methods: {
            ...mapActions('groupsModule', ['setGroups', 'deleteGroup']),
            editGroup(id) {
                this.$router.push(`/groups/edit/${id}`);
            },
            removeGroup(id) {
                this.deleteGroup(id);
                this.modalState = false;
                this.setGroups();
            },
            showModal(id) {
                this.currentGroup = id;
                this.modalState = true;
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.groups.reverse();
                } else {
                    this.sortParam = prop;
                    this.groups.sort(this[type]);
                }
            },
            compareString(a, b) {
                if(a[this.sortParam] < b[this.sortParam]) return -1;
                if(a[this.sortParam] > b[this.sortParam]) return 1;
                return 0;
            }
        },
        async mounted() {
            this.setGroups();
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