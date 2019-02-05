import axios from "axios";

export default {
    namespaced: true,
    state: {
        apps: null,
        app: null,
        parks: null,
        types: null,
        notification: {
            state: false,
            message: null
        },
        excelData: null
    },
    getters: {
        apps(state) {
            return state.apps;
        },
        app(state) {
            return state.app;
        },
        parks(state) {
            return state.parks;
        },
        types(state) {
            return state.types;
        },
        notification(state) {
            return state.notification;
        },
        excelData(state) {
            return state.excelData;
        }
    },
    mutations: {
        setApps(state, apps) {
            state.apps = apps;

            state.excelData = apps.map(item => {
                const excel_item = {
                    id: item.appObjid,
                    name: item.appName,
                    park: item.appPark.parkName,
                    type: item.appType.appTypeDescription
                };
                return excel_item;
            })
        },
        setApp(state, id) {
            state.app = state.apps.find(item => item.appObjid === id);
        },
        deleteApp(state, id) {
            const indexToRemove = state.apps.findIndex(item => item.appObjid === id);
            state.apps = state.apps.slice(indexToRemove, 1);
        },
        setParks(state, parks) {
            state.parks = parks;
        },
        setTypes(state, types) {
            state.types = types;
        },
        setNotification(state, message) {
            state.notification.state = !state.notification.state;
            state.notification.message = message;
        }
    },
    actions: {
        async setApps(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/app/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });
            context.commit('setApps', data);
        },

        saveApp(context, payload) {
            const data = () => {
                if (payload.appObjid) {
                    return {
                        appObjid: payload.appObjid,
                        appPark: {
                            parkId: payload.appPark.parkId,
                        },
                        appType: {
                            appTypeId: payload.appType.appTypeId
                        },
                        appIpAddress: payload.appIpAddress,
                        appName: payload.appName,
                    };
                } else {
                    return {
                        appPark: {
                            parkId: payload.park,
                        },
                        appType: {
                            appTypeId: payload.type
                        },
                        appIpAddress: payload.ip,
                        appName: payload.name,
                    };
                }
            };

            axios.post(`${process.env.VUE_APP_HOST}/app/save`, data(),{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setApps');
            });
        },

        deleteApp(context, payload) {
            const data = {
                appObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/app/delete`, data,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteApp', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setApps');
            });
        },

        async setParks(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/park/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });

            context.commit('setParks', data);
        },

        async setTypes(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/appType/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });

            context.commit('setTypes', data);
        }
    }
};