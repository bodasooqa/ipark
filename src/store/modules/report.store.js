import axios from "axios";
export default {
    namespaced: true,
    state: {
        reports: null
    },
    getters: {
        reports(state) {
            return state.reports;
        }
    },
    mutations: {
        setReport(state, res) {
            state.reports = res.data;
        }
    },
    actions: {
        async setReport(context, payload){
            const data = {
                cardtypes: payload.cardtypes,
                enddt: payload.enddt,
                groups: payload.groups,
                startdt: payload.startdt,
            };
            axios.post(`${process.env.VUE_APP_HOST}/rptEntrApi/get`, data,{
                headers: {
                    'Authorization': `Bearer ${context.rootGetters['authModule/token']}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                context.commit('setReport', res);
            });
        }

    }
}
