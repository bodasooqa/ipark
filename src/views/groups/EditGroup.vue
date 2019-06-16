<template>
    <div id="edit-group">
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить группу</div>
            <div class="card-body">
                <form @submit.prevent="saveGroup(group); $router.go(-1)">
                    <div class="form-group">
                        <label for="">Наименование</label>
                        <input v-model="group.groupName" type="text" class="form-control" required placeholder="Наименование">
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
            <div class="card-header">
                <button type="button" class="btn btn-link collapse-arrow collapsed" data-toggle="collapse" data-target="#collapseExample1"
                        aria-expanded="false" aria-controls="collapseExample1"><i class="fab fa-accessible-icon mr-2"></i>Настройка аттракционов</button>
            </div>
            <div class="collapse" id="collapseExample1">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Выбрано</th>
                                <th>Режим</th>
                                <th>Наименование</th>
                                <th>Парк</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(attr, i) in attrs" :key="i">
                                <td><input @change="saveAttr(attr)" v-model="attr.checked" type="checkbox"></td>
                                <td>{{attr.atrCode}}</td>
                                <td>{{attr.atrName}}</td>
                                <td>{{attr.atrParkName}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">
                <button type="button" class="btn btn-link collapse-arrow collapsed" data-toggle="collapse" data-target="#collapseExample2"
                        aria-expanded="false" aria-controls="collapseExample2"><i class="fas fa-users mr-2"></i>Настройка пользователей</button>
            </div>
            <div class="collapse" id="collapseExample2">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover" id="dataTable2" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Выбрано</th>
                                <th>ФИО</th>
                                <th>Пользователь</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(user, i) in users" :key="i">
                                <td><input @change="saveUser(user)" v-model="user.checked" type="checkbox"></td>
                                <td>{{user.userFio}}</td>
                                <td>{{user.userName}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditGroup",
        computed: {
            ...mapGetters('groupsModule', ['notification', 'groups', 'group', 'attrs', 'users']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('groupsModule', ['setGroups', 'saveGroup', 'setAttrs', 'setUsers', 'saveAttr', 'saveUser']),
            ...mapMutations('groupsModule', ['setGroup'])
        },
        created() {
            this.setGroups();
            this.setGroup(this.id);
            this.setAttrs({groupAtrMainobjid: this.id});
            this.setUsers({groupUserMainobjid: this.id});
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

    .card-header {
        border-bottom: none !important;
    }

    .collapse-arrow {
        position: relative;
        &:after {
            content: ' ';
            width: 6px;
            height: 6px;
            position: absolute;
            border-bottom: 2px solid #000;
            border-left: 2px solid #000;
            transition: all 0.2s;
            transform: rotate(135deg);
            top: 16px;
            right: 0;
        }
        &.collapsed {
            &:after {
                transform: rotate(-45deg);
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
