import axios from "axios";

export default {
    namespaced: true,
    state: {
        devices: null,
        device: null,
        notification: {
            state: false,
            message: null
        },
        parks: null,
        deviceAddresses: null,
        deviceAddress: null
    },
    getters: {
        devices(state) {
            return state.devices
        },
        device(state) {
            return state.device;
        },
        notification(state) {
            return state.notification;
        },
        parks(state) {
            return state.parks;
        },
        deviceAddresses(state) {
            return state.deviceAddresses;
        },
        deviceAddress(state) {
            return state.deviceAddress;
        }
    },
    mutations: {
        setDevices(state, data) {
            state.devices = data;
        },
        setDevice(state, id) {
            state.device = state.devices.find(item => item.atrHostObjid === id);
        },
        setNotification(state, message) {
            state.notification.state = !state.notification.state;
            state.notification.message = message;
        },
        setParks(state, parks) {
            state.parks = parks;
        },
        deleteDevice(state, id) {
            const indexToRemove = state.devices.findIndex(item => item.atrHostObjid === id);
            state.devices = state.devices.slice(indexToRemove, 1);
        },
        deleteDeviceAddress(state, id) {
            state.deviceAddresses = state.deviceAddresses.filter(item => {
                return item.atrDeviceObjid !== id;
            });
        },
        setDeviceAddresses(state, data) {
            state.deviceAddresses = data;
        },
        setDeviceAddress(state, id) {
            state.deviceAddress = state.deviceAddresses.find(item => item.atrDeviceObjid === id);
        },
    },
    actions: { 
        async setDevices(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/atrHost/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });
            context.commit('setDevices', data);
        },

        saveDevice(context, payload) {
            axios.post(`${process.env.VUE_APP_HOST}/atrHost/save`, payload,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);

                context.dispatch('setDevices');
            });
        },

        deleteDevice(context, payload) {
            const data = {
                atrHostObjid: payload
            };

            axios.post(`${process.env.VUE_APP_HOST}/atrHost/delete`, data,{
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteDevice', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);

                context.dispatch('setDevices');
            });
        },

        async setParks(context) {
            let {data} = await axios.get(`${process.env.VUE_APP_HOST}/park/get`, {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });

            context.commit('setParks', data);
        },

        async setDeviceAddresses(context, payload) {
            let {data} = await axios.post(`${process.env.VUE_APP_HOST}/atrDevice/get`, payload,
                {
                headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
            });

            context.commit('setDeviceAddresses', data)
        },

        saveDeviceAddress(context, payload) {
            axios.post(`${process.env.VUE_APP_HOST}/atrDevice/save`, payload, {
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('setNotification', 'Успешно сохранено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно сохранено');
                }, 4000);
            })
        },

        deleteDeviceAddress(context, payload) {
            axios.post(`${process.env.VUE_APP_HOST}/atrDevice/delete`, {
                atrDeviceObjid: payload
            }, {
                headers: {
                    'Authorization': 'Basic YWRtaW46YWRtaW4=',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                context.commit('deleteDeviceAddress', payload);
                context.commit('setNotification', 'Успешно удалено');
                setTimeout(() => {
                    context.commit('setNotification', 'Успешно удалено');
                }, 4000);
            });
        }
    }
}