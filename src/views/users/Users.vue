<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Пользователи</div>
        <div class="card-body">
            <button @click="$router.push('users/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>

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
                        <td>{{user.name}}</td>
                        <td>{{user.username}}</td>
                        <td>{{user.available}}</td>
                        <td class="text-center">
                            <button @click="editApp(user.id)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(user.id)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
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
                            <p>Действительно удалить {{currentUser}}?</p>
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
        name: "Users",
        data: () => {
            return {
                users: [
                    {
                        id: '1',
                        name: 'Сигизмунд Тарковски',
                        username: 'chava',
                        available: false,
                    },
                    {
                        id: '2',
                        name: 'Уильям Бростон',
                        username: 'journey',
                        available: true,
                    },
                    {
                        id: '3',
                        name: 'Амодей Грондсон',
                        username: 'bodasooqa',
                        available: true,
                    },
                    {
                        id: '4',
                        name: 'Руслан Романов',
                        username: 'boda',
                        available: false,
                    },
                ],
                theads: [
                    {
                        name: 'ФИО',
                        type: 'compareString',
                        param: 'name'
                    },
                    {
                        name: 'Пользователь',
                        type: 'compareString',
                        param: 'username'
                    },
                    {
                        name: 'Включен',
                        type: 'compareString',
                        param: 'available'
                    },
                    {
                        name: 'Действия'
                    },
                ],
                modalState: false,
                currentUser: null,
                sortParam: null
            }
        },
        methods: {
            editApp(id) {
                this.$router.push(`/users/edit/${id}`);
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