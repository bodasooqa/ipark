<template>
    <div id="edit-group">
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить график</div>
            <div class="card-body">
                <form @submit.prevent="saveGroup(group)">
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
            <div class="card-header"><i class="fas fa-tasks mr-2"></i>Настройка аттракционов</div>
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
                            <td><input v-model="attr.checked" type="checkbox"></td>
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
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import { Datetime } from 'vue-datetime';

    export default {
        name: "EditGroup",
        components: {
            datetime: Datetime
        },
        computed: {
            ...mapGetters('groupsModule', ['notification', 'groups', 'group', 'attrs', 'users']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('groupsModule', ['setGroups', 'saveGroup', 'setAttrs', 'setUsers']),
            ...mapMutations('groupsModule', ['setGroup'])
        },
        created() {
            this.setGroups();
            this.setGroup(this.id);
            this.setAttrs({groupObjid: this.id});
            this.setUsers({groupObjid: this.id});
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