import axios from "axios";

export default {
    namespaced: true,
    state: {
        groups: null,
        notification: {
            state: false,
            message: null
        },
        group: null,
        attrs: null,
        users: null
    },
    getters: {
        groups(state) {
            return state.groups;
        },
        notification(state) {
            return state.notification;
        },
        group(state) {
            return state.group;
        },
        attrs(state) {
            return state.attrs
        },
        users(state) {
            return state.users
        }
    },
    mutations: {
        setGroups(state, data) {
            state.groups = data;
        },
        setGroup(state, id) {
            state.group = state.groups.find(item => item.groupObjid === id);
        },
        deleteGroup(state, id) {
            const indexToRemove = state.groups.findIndex(item => item.groupObjid === id);
            state.groups = state.groups.slice(indexToRemove, 1);
        },
        setNotification(state, message) {
            state.notification.state = !state.notification.state;
            state.notification.message = message;
        },
        setAttrs(state, data) {
            state.attrs = data;
        },
        setUsers(state, data) {
            state.users = data;
        }
    },
    actions: {
        async setGroups(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/group/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });
            context.commit('setGroups', data);
        },

        saveGroup(context, payload) {
            const data = () => {
                if (payload.groupObjid) {
                    return {
                        groupObjid: payload.groupObjid,
                        groupName: payload.groupName,
                    };
                } else {
                    return {
                        groupName: payload.groupName,
                    };
                }
            };

            axios.post(`${process.env.VUE_APP_HOST}/group/save`, data(),{
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setGroups');
            });
        },
        
        deleteGroup(context, payload) {
            const data = {
                groupObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/group/delete`, data,{
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteGroup', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setGroups');
            });
        },

        async setAttrs(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/groupAtr/get`, payload, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });
            context.commit('setAttrs', data);
        },

        async setUsers(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/groupUser/get`, payload, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });
            context.commit('setUsers', data);
        },

        saveAttr(context, payload) {
            payload.groupAtrObjid = payload.atrObjid;
            if (payload.checked) {
                axios.post(`${process.env.VUE_APP_HOST}/groupAtr/save`, payload, {
                    headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
                });
            } else {
                axios.post(`${process.env.VUE_APP_HOST}/groupAtr/delete`, payload, {
                    headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
                });
            }

        },

        saveUser(context, payload) {
            payload.groupUserObjid = payload.userObjid;
            if (payload.checked) {
                axios.post(`${process.env.VUE_APP_HOST}/groupUser/save`, payload, {
                    headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
                });
            } else {
                axios.post(`${process.env.VUE_APP_HOST}/groupUser/delete`, payload, {
                    headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
                });
            }
        }
    }
};