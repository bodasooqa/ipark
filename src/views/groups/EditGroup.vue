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
            ...mapGetters('groupsModule', ['notification', 'groups', 'group']),

            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('groupsModule', ['setGroups', 'saveGroup']),
            ...mapMutations('groupsModule', ['setGroup'])
        },
        created() {
            this.setGroups();
            this.setGroup(this.id);
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