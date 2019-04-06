<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Карты</div>
        <div class="card-body">
            <button @click="$router.push('cards/add-new')" class="btn btn-success mr-2 mb-3">Добавить</button>

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
                    <tr v-for="card in cards" :key="card.cardTypeObjid">
                        <td>{{card.cardTypeName}}</td>
                        <td><input type="checkbox" v-model="card.cardTypeMainType"></td>
                        <td>{{card.cardTypeWorking}}</td>
                        <td class="text-center">
                            <button @click="editCard(card.cardTypeObjid)" class="btn btn-sm btn-primary mr-1"><i class="fas fa-pen"></i></button>
                            <button @click="showModal(card.cardTypeObjid)" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
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
                            <p>Действительно удалить {{currentCard}}?</p>
                        </div>
                        <div class="modal-footer">
                            <button @click="removeCard(currentCard)" type="button" class="btn btn-success">Удалить</button>
                            <button @click="modalState = false" type="button" class="btn btn-danger">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="modalState" class="modal-backdrop fade show"></div>
        </transition>

        <transition name="fade">
            <div v-if="this.notification.state" class="alert alert-success" role="alert">{{notification.message}}</div>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Cards",
        data: () => {
            return {
                theads: [
                    { name: 'Наименование', type: 'compareString', param: 'name' },
                    { name: 'Основная', type: 'compareString', param: 'main' },
                    { name: 'Работает', type: 'compareString', param: 'working' },
                    { name: 'Действия' },
                ],
                modalState: false,
                currentCard: null,
                sortParam: null
            }
        },
        computed: {
            ...mapGetters('cardsModule', ['cards', 'notification'])
        },
        methods: {
            ...mapActions('cardsModule', ['setCards', 'deleteCard']),
            ...mapMutations('cardsModule', ['setNotification']),
            editCard(id) {
                this.$router.push(`/cards/edit/${id}`);
            },
            removeCard(id) {
                this.deleteCard(id);
                this.modalState = false;
                this.setCards();
            },
            showModal(id) {
                this.currentCard = id;
                this.modalState = true;
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.cards.reverse();
                } else {
                    this.sortParam = prop;
                    this.cards.sort(this[type]);
                }
            },
            compareString(a, b) {
                if(a[this.sortParam] < b[this.sortParam]) return -1;
                if(a[this.sortParam] > b[this.sortParam]) return 1;
                return 0;
            }
        },
        created() {
            this.setCards();
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

    .alert {
        position: absolute;
        width: 100%;
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