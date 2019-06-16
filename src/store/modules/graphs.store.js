import axios from "axios";

export default {
    namespaced: true,
    state: {
        graphs: null,
        graph: null,
        notification: {
            state: false,
            message: null
        },
        parks: null,
        types: null,
        graphSettings: null,
        excelData: null
    },
    getters: {
        graphs(state) {
            return state.graphs;
        },
        graph(state) {
            return state.graph;
        },
        notification(state) {
            return state.notification;
        },
        parks(state) {
            return state.parks;
        },
        types(state) {
            return state.types;
        },
        graphSettings(state) {
            return state.graphSettings;
        },
        excelData(state) {
            return state.excelData;
        }
    },
    mutations: {
        setGraphs(state, graphs) {
            state.graphs = graphs;

            state.excelData = graphs.map(item => {
                const excel_item = {
                    id: item.graphObjid,
                    priority: item.graphPriority,
                    name: item.graphName,
                    park: item.graphPark.parkName,
                    type: item.graphType.graphTypeName
                };
                return excel_item;
            })
        },
        setGraph(state, id) {
            state.graph = state.graphs.find(item => item.graphObjid === id);
        },
        deleteGraph(state, id) {
            const indexToRemove = state.graphs.findIndex(item => item.graphObjid === id);
            state.graphs = state.graphs.slice(indexToRemove, 1);
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
        },
        setGraphSettings(state, data) {
            state.graphSettings = data;
        }
    },
    actions: {
        async setGraphs(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/graph/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });
            context.commit('setGraphs', data);
        },

        saveGraph(context, payload) {
            const data = () => {
                if (payload.graphObjid) {
                    return {
                        graphObjid: payload.graphObjid,
                        graphPark: {
                            parkId: payload.graphPark.parkId,
                        },
                        graphType: {
                            graphTypeId: payload.graphType.graphTypeId
                        },
                        graphPriority: payload.graphPriority,
                        graphName: payload.graphName,
                    };
                } else {
                    return {
                        graphPark: {
                            parkId: payload.park,
                        },
                        graphType: {
                            graphTypeId: payload.type
                        },
                        graphName: payload.graphName,
                        graphPriority: payload.graphPriority,
                    };
                }
            };

            axios.post(`${process.env.VUE_APP_HOST}/graph/save`, data(),{
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setGraphs');
            });
        },

        deleteGraph(context, payload) {
            const data = {
                graphObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/graph/delete`, data, {
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteGraph', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setGraphs');
            });
        },

        async setParks(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/park/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });

            context.commit('setParks', data);
        },

        async setTypes(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/graphType/get`, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });

            context.commit('setTypes', data);
        },

        async setGraphSettings(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/graphSettings/get`, {
                graphObjid: payload
            }, {
                headers: {'Authorization': `Bearer ${context.rootGetters['authModule/token']}`}
            });

            data = data.filter(item => {
                return item.graphSettingsMainobjid === payload;
            });

            data.map(item => {
                item.graphSettingsStartdt = item.graphSettingsStartdt.replace(' ', 'T');
                item.graphSettingsEnddt = item.graphSettingsEnddt.replace(' ', 'T');
                return item;
            });

            context.commit('setGraphSettings', data);
        },

        saveGraphSetting(context, payload) {
            payload.graphSettingsStartdt = payload.graphSettingsStartdt.replace('T', ' ');
            payload.graphSettingsStartdt = payload.graphSettingsStartdt.replace('.000Z', '');
            payload.graphSettingsEnddt = payload.graphSettingsEnddt.replace('T', ' ');
            payload.graphSettingsEnddt = payload.graphSettingsEnddt.replace('.000Z', '');

            axios.post(`${process.env.VUE_APP_HOST}/graphSettings/save`, payload, {
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.dispatch('setGraphSettings', payload.graphSettingsMainobjid)
            })
        },

        deleteGraphSetting(context, payload) {
            delete payload.graphSettingsStartdt;
            delete payload.graphSettingsEnddt;

            axios.post(`${process.env.VUE_APP_HOST}/graphSettings/delete`, payload, {
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.dispatch('setGraphSettings', payload.graphSettingsMainobjid)
            })
        }
    }
};
