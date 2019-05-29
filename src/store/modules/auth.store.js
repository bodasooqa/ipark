import axios from "axios";
import router from '../../router';

export default {
    namespaced: true,
    state: {
        token: null,
        mainMenu: null,
        notification: false
    },
    getters: {
        token(state) {
            return state.token;
        },
        mainMenu(state) {
            return state.mainMenu;
        },
        notification(state) {
            return state.notification;
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data;
        },
        setMenu(state, data) {
            state.mainMenu = data;
        },
        setNotification(state, creation) {
            if (creation) {
                state.notification = false;
            } else {
                state.notification = true;
                setTimeout(() => {
                    state.notification = false;
                }, 5000);
            }
        }
    },
    actions: {
        setToken(context, payload) {
            axios.post(`${process.env.VUE_APP_HOST}/login?username=${payload.username}&password=${payload.password}`).then(res => {
                context.commit('setToken', res.data);
                router.push('/');
            }).catch(() => {
                context.commit('setNotification');
            });
        },
        async setMenu(context) {
            let data = await axios.get(`${process.env.VUE_APP_HOST}/mainMenu/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });
            context.commit('setMenu', data.data);
        }
    }
}