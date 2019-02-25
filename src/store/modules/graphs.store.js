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
        graphSettings: null
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
        graphSettings(state) {
            return state.graphSettings;
        }
    },
    mutations: {
        setGraphs(state, graphs) {
            state.graphs = graphs;
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
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });
            context.commit('setGraphs', data);
        },

        saveGraph(context, payload) {
            console.log(payload);
            /*const data = () => {
                if (payload.graphObjid) {
                    return {
                        graphObjid: payload.graphObjid,
                        graphPark: {
                            parkId: payload.graphPark.parkId,
                        },
                        graphType: {
                            graphTypeId: payload.graphType.graphTypeId
                        },
                        graphIpAddress: payload.graphIpAddress,
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
                        graphIpAddress: payload.ip,
                        graphName: payload.name,
                    };
                }
            };

            axios.post(`${process.env.VUE_APP_HOST}/graph/save`, data(),{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setGraphs');
            });*/
        },

        deleteGraph(context, payload) {
            const data = {
                graphObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/graph/delete`, data, {
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
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
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });

            context.commit('setParks', data);
        },

        async setGraphSettings(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/graphSettings/get`, {
                graphObjid: payload
            }, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
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
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
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
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.dispatch('setGraphSettings', payload.graphSettingsMainobjid)
            })
        }
    }
};