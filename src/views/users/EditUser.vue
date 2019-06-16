<template>
    <div id="edit-user">
        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-pen mr-2"></i>Изменить пользователя</div>
            <div class="card-body">
                <form @submit.prevent="saveUser(user); $router.go(-1)">
                    <div class="form-group">
                        <label for="">ФИО</label>
                        <input v-model="user.userFio" type="text" class="form-control" required placeholder="Наименование">
                    </div>
                    <div class="form-row">
                        <div class="col">
                            <label for="">Пароль</label>
                            <div class="input-group">
                                <input v-model="user.password" type="password" class="form-control" :disabled="lockedPassword" :required="user.password" placeholder="Пароль">
                                <div class="input-group-append">
                                    <button @click="lockPassword" class="btn btn-secondary" type="button">
                                        <i v-if="lockedPassword" class="fas fa-lock"></i>
                                        <i v-if="!lockedPassword" class="fas fa-unlock"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label for="">Пароль повторно:</label>
                            <input v-model="checkPassword" @change="changePassword = !changePassword" type="password" class="form-control" :class="{'is-invalid': !checkPass && changePassword}" :disabled="!user.password || lockedPassword" :required="checkPassword" placeholder="Пароль повторно">
                            <div class="invalid-feedback">Пароли не совпадают</div>
                        </div>
                    </div>
                    <div class="form-check my-3">
                        <input id="enabled" v-model="user.userEnabled" type="checkbox" class="form-check-input">
                        <label for="enabled" class="form-check-label">Доступен</label>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Сохранить</button>
                    <button @click="$router.go(-1)" type="button" class="btn btn-danger">Отмена</button>
                </form>
            </div>

            <transition name="fade">
                <div v-if="this.notification.state" class="alert alert-success" role="alert">{{notification.message}}</div>
            </transition>
        </div>

        <div class="card mb-3">
            <div class="card-header"><i class="fas fa-tasks mr-2"></i>Изменить привелегии</div>
            <div class="card-body">
                <form>
                    <div v-for="item in priv" class="form-check my-3" :key="item.privilegeId">
                        <input @change="changePriv({uid: id, state: item.checked, id: item.privilegeId, name: item.privilegeName, desc: item.privilegeDescription})" :id="`priv-${item.privilegeId}`" v-model="item.checked" type="checkbox" class="form-check-input">
                        <label :for="`priv-${item.privilegeId}`" class="form-check-label">{{item.privilegeDescription}}</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "EditUser",
        data: () => {
            return {
                checkPassword: null,
                lockedPassword: true,
                changePassword: false
            }
        },
        computed: {
            ...mapGetters('usersModule', ['notification', 'users', 'user', 'priv']),
            id() {
                return this.$route.params.id;
            },
            checkPass() {
                return this.checkPassword === this.user.password;
            }
        },
        methods: {
            ...mapActions('usersModule', ['setUsers', 'saveUser', 'setPriv', 'changePriv']),
            ...mapMutations('usersModule', ['setUser']),
            lockPassword() {
                if (!this.lockedPassword) {
                    this.user.password = '';
                    this.checkPassword = '';
                }
                this.lockedPassword = !this.lockedPassword;
            }
        },
        created() {
            if (!this.$store.state.users) {
                this.setUsers();
            }
            this.setUser(this.id);
            this.setPriv(this.id);
        }
    }
</script>

<style lang="scss" scoped>
    .alert {
        position: absolute;
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
