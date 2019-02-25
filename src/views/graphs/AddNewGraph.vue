<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новый график</div>
        <div class="card-body">
            <form @submit.prevent="addGraph">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="graph.graphName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">Приоритет</label>
                    <input v-model="graph.graphPriority" type="text" class="form-control" required placeholder="Приоритет">
                </div>
                <div class="form-group">
                    <label for="">Тип графика</label>
                    <select v-model="graph.type" class="form-control" required>
                        <option disabled selected>Тип графика</option>
                        <option v-for="type in types" :value="type.graphTypeId" :key="type.graphTypeId">{{type.graphTypeDescription}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Парк</label>
                    <select v-model="graph.park" class="form-control" required>
                        <option disabled selected>Парк</option>
                        <option v-for="park in parks" :value="park.parkId" :key="park.parkId">{{park.parkName}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    class Graph {
        constructor(name, graphPriority, type, park) {
            this.graphName = name;
            this.graphPriority = graphPriority;
            this.type = type;
            this.park = park;
        }
    }

    export default {
        name: "AddNewGraph",
        data() {
            return {
                graph: new Graph()
            }
        },
        computed: {
            ...mapGetters('graphsModule', ['parks'])
        },
        methods: {
            ...mapActions('graphsModule', ['saveGraph', 'setParks']),

            addGraph() {
                this.saveGraph(this.graph);
                this.$router.go(-1);
            }
        },
        created() {
            if (!this.$store.parks) {
                this.setParks();
            }
        }
    }
</script>

<style scoped>

</style>