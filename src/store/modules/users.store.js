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
        priv: null
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
        priv(state) {
            return state.priv;
        }
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
        setPriv(state, priv) {
            state.priv = priv;
        },
    },
    actions: {
        async setUsers(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/user/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
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
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
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
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
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
        async setPriv(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/userPrivileges/get`,
                {
                    userPrivilegeMainobjid: payload
                },
                {
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            });

            context.commit('setPriv', data);
        },
        async changePriv(context, payload) {
            if (payload.state === true) {
                await axios.post(`${process.env.VUE_APP_HOST}/userPrivileges/save`,
                    {
                        userPrivilegeMainobjid: payload.uid,
                        privilegeId: payload.id,
                        privilegeName: payload.name,
                        privilegeDescription: payload.desc,
                        checked: payload.state
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                            'Content-Type': 'application/json'
                        }
                    });
            } else {
                await axios.post(`${process.env.VUE_APP_HOST}/userPrivileges/delete`,
                    {
                        userPrivilegeMainobjid: payload.uid,
                        privilegeId: payload.id
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                            'Content-Type': 'application/json'
                        }
                    });
            }
        }
    }
};
