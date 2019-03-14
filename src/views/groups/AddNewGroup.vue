<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новую группу</div>
        <div class="card-body">
            <form @submit.prevent="addGroup">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="group.groupName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    class Group {
        constructor(name) {
            this.groupName = name;
        }
    }

    export default {
        name: "AddNewGroup",
        data() {
            return {
                group: new Group()
            }
        },
        methods: {
            ...mapActions('groupsModule', ['saveGroup']),

            addGroup() {
                this.saveGroup(this.group);
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>