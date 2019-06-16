<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Пользователи</div>
        <div class="card-body">
            <button @click="$router.push('users/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>

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
                    <tr v-for="user in users" :key="user.id">
                        <td>{{user.userFio}}</td>
                        <td>{{user.userName}}</td>
                        <td><input @change="saveUser(user)" type="checkbox" v-model="user.userEnabled"></td>
                        <td class="text-center">
                            <button @click="editUser(user.userObjid)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(user.userObjid)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
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
                            <p>Действительно удалить {{currentUser}}?</p>
                        </div>
                        <div class="modal-footer">
                            <button @click="removeUser(currentUser)" type="button" class="btn btn-success">Удалить</button>
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
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Users",
        data: () => {
            return {
                theads: [
                    { name: 'ФИО', type: 'compareString', param: 'name' },
                    { name: 'Пользователь',type: 'compareString',param: 'username' },
                    { name: 'Включен',type: 'compareString',param: 'available' },
                    { name: 'Действия' },
                ],
                modalState: false,
                currentUser: null,
                sortParam: null
            }
        },
        computed: {
            ...mapGetters('usersModule', ['users', 'notification', 'excelData']),
        },
        methods: {
            ...mapActions('usersModule', ['setUsers', 'deleteUser', 'saveUser']),
            editUser(id) {
                this.$router.push(`/users/edit/${id}`);
            },
            removeUser(id) {
                this.deleteUser(id);
                this.modalState = false;
                this.setUsers();
            },
            showModal(id) {
                this.currentUser = id;
                this.modalState = true;
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.users.reverse();
                } else {
                    this.sortParam = prop;
                    this.users.sort(this[type]);
                }
            },
            compareString(a, b) {
                if(a[this.sortParam] < b[this.sortParam]) return -1;
                if(a[this.sortParam] > b[this.sortParam]) return 1;
                return 0;
            }
        },
        async mounted() {
            // this.sortData('name', 'compareString');
            this.setUsers();
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
