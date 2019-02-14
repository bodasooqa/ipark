<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новое приложение</div>
        <div class="card-body">
            <form @submit.prevent="addAttr">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="attr.name" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-group">
                    <label for="">IP-адрес</label>
                    <input v-model="attr.ip" type="text" class="form-control" required placeholder="IP-адрес">
                </div>
                <div class="form-group">
                    <label for="">Тип приложения</label>
                    <select v-model="attr.type" class="form-control" required>
                        <option disabled selected>Тип приложения</option>
                        <option v-for="type in types" :value="type.attrTypeId" :key="type.attrTypeId">{{type.attrTypeDescription}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Парк</label>
                    <select v-model="attr.park" class="form-control" required>
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

    class Attr {
        constructor(name, ip, type, park) {
            this.name = name;
            this.ip = ip;
            this.type = type;
            this.park = park;
        }
    }

    export default {
        name: "AddNewAttr",
        data() {
            return {
                attr: new Attr()
            }
        },
        computed: {
            ...mapGetters('attrsModule', ['parks', 'types'])
        },
        methods: {
            ...mapActions('attrsModule', ['saveAttr', 'setParks', 'setTypes']),

            addAttr() {
                this.saveAttr(this.attr);
                this.$router.go(-1);
            }
        },
        created() {
            if (!this.$store.parks) {
                this.setParks();
            }
            if (!this.$store.types) {
                this.setTypes();
            }
        }
    }
</script>

<style scoped>

</style>