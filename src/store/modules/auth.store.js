import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null
    },
    getters: {
        token(state) {
            return state.token;
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data;
        }
    },
    actions: {
        setToken(context, payload) {
            axios.post(`${process.env.VUE_APP_HOST}/login?username=${payload.username}&password=${payload.password}`).then(res => {
                context.commit('setToken', res.data);
            });
        }
    }
}