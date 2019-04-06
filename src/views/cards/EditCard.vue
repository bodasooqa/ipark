<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить карту</div>
        <div class="card-body">
            <form @submit.prevent="saveCard(card)">
                <input type="hidden" v-model="card.cardTypeObjid">
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
                <button type="submit" class="btn btn-primary mr-2">Сохранить</button>
                <button @click="$router.go(-1)" type="button" class="btn btn-danger">Назад</button>
            </form>
        </div>
        <transition name="fade">
            <div v-if="this.notification.state" class="alert alert-success" role="alert">{{notification.message}}</div>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditCard",
        computed: {
            ...mapGetters('cardsModule', ['notification', 'cards', 'card']),
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            ...mapActions('cardsModule', ['setCards', 'saveCard']),
            ...mapMutations('cardsModule', ['setCard']),
        },
        created() {
            this.setCards();
            this.setCard(this.id);
        }
    }
</script>

<style scoped>

</style>