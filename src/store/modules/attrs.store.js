import axios from "axios";

export default {
    namespaced: true,
    state: {
        attrs: null,
        attr: null,
        notification: {
            state: false,
            message: null
        },
    },
    getters: {
        attrs(state) {
            return state.attrs;
        },
        attr(state) {
            return state.attr;
        },
        notification(state) {
            return state.notification;
        }
    },
    mutations: {
        setAttrs(state, attrs) {
            state.attrs = attrs;
        },
        setAttr(state, id) {
            state.attr = state.attrs.find(item => item.atrObjid === id);
        },
        deleteAttr(state, id) {
            const indexToRemove = state.attrs.findIndex(item => item.atrObjid === id);
            state.attrs = state.attrs.slice(indexToRemove, 1);
        },
        setNotification(state, message) {
            state.notification.state = !state.notification.state;
            state.notification.message = message;
        }
    },
    actions: {
        async setAttrs(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/atr/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });
            context.commit('setAttrs', data);
        },

        saveAttr(context, payload) {
            const data = () => {
                if (payload.atrObjid) {
                    return {
                        atrObjid: payload.atrObjid,
                        attrPark: {
                            parkId: payload.attrPark.parkId,
                        },
                        attrType: {
                            attrTypeId: payload.attrType.attrTypeId
                        },
                        attrIpAddress: payload.attrIpAddress,
                        attrName: payload.attrName,
                    };
                } else {
                    return {
                        attrPark: {
                            parkId: payload.park,
                        },
                        attrType: {
                            attrTypeId: payload.type
                        },
                        attrIpAddress: payload.ip,
                        attrName: payload.name,
                    };
                }
            };

            axios.post(`${process.env.VUE_APP_HOST}/atr/save`, data(),{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setAttrs');
            });
        },

        deleteAttr(context, payload) {
            const data = {
                atrObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/atr/delete`, data,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteAttr', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setAttrs');
            });
        },
    }
};