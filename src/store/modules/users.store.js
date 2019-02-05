import axios from "axios";

export default {
    namespaced: true,
    state: {
        users: null,
        user: null,
        notification: {
            state: false,
            message: null
        },
    },
    getters: {
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
        notification(state) {
            return state.notification;
        },
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setNotification(state, message) {
            state.notification.state = !state.notification.state;
            state.notification.message = message;
        },
        setUser(state, id) {
            state.user = state.users.find(item => item.userObjid === id);
        },
        deleteUser(state, id) {
            const indexToRemove = state.users.findIndex(item => item.userObjid === id);
            state.users = state.users.slice(indexToRemove, 1);
        },
    },
    actions: {
        async setUsers(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/user/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });
            context.commit('setUsers', data);
        },
        saveUser(context, payload) {
            const data = () => {
                if (payload.userObjid) {
                    return {
                        userObjid: payload.userObjid,
                        userFio: payload.userFio,
                        userName: payload.userName,
                        userEnabled: payload.userEnabled
                    };
                } else {
                    return {
                        userFio: payload.userFio,
                        userName: payload.userName,
                        userEnabled: payload.userEnabled
                    };
                }
            };

            const userData = data();

            if (payload.password) {
                userData.userPassword = payload.password;
            }

            axios.post(`${process.env.VUE_APP_HOST}/user/save`, userData,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setUsers');
            });
        },
        deleteUser(context, payload) {
            const data = {
                userObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/user/delete`, data,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteUser', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setUsers');
            });
        },
    }
};
