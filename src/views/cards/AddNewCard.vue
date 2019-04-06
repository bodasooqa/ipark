<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-plus mr-2"></i>Добавить новую карту</div>
        <div class="card-body">
            <form @submit.prevent="addCard">
                <div class="form-group">
                    <label for="">Наименование</label>
                    <input v-model="card.cardTypeName" type="text" class="form-control" required placeholder="Наименование">
                </div>
                <div class="form-check my-3">
                    <input id="gen" v-model="card.cardTypeMainType" type="checkbox" class="form-check-input">
                    <label for="gen" class="form-check-label">Основная</label>
                </div>
                <div class="form-check my-3">
                    <input id="work" v-model="card.cardTypeWorking" type="checkbox" class="form-check-input">
                    <label for="work" class="form-check-label">Работает</label>
                </div>
                <button type="submit" class="btn btn-primary mr-2">Отправить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AddNewCard",
        data() {
            return {
                card: {
                    cardTypeName: null,
                    cardTypeMainType: null,
                    cardTypeWorking: null,
                }
            }
        },
        computed: {
            ...mapGetters('cardsModule', ['parks'])
        },
        methods: {
            ...mapActions('cardsModule', ['saveCard', 'setParks']),

            addCard() {
                this.saveCard(this.card);
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>

</style>