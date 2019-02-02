import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apps: null,
    parks: null,
    types: null,
    sidebarMenu: [
      {
        name: 'Приложения',
        icon: 'fas fa-shapes',
        url: 'applications'
      },
      {
        name: 'Пользователи',
        icon: 'fas fa-users',
        url: 'users'
      },
      {
        name: 'Графики',
        icon: 'fas fa-calendar-alt',
        url: 'schedules'
      },
      {
        name: 'Карты',
        icon: 'far fa-id-card',
        url: 'cards'
      },
      {
        name: 'Устройства',
        icon: 'fas fa-desktop',
        url: 'devices'
      },
      {
        name: 'Атракционы',
        icon: 'fas fa-rocket',
        url: 'attractions'
      },
      {
        name: 'Группы',
        icon: 'fas fa-layer-group',
        url: 'groups'
      },
      {
        name: 'Отчет по кассам',
        icon: 'fas fa-cash-register',
        url: 'cashbox-reports'
      },
      {
        name: 'Отчет по проходам',
        icon: 'fas fa-walking',
        url: 'pass-reports'
      },
      {
        name: 'Отчет по картам',
        icon: 'fas fa-object-ungroup',
        url: 'card-reports'
      },
      {
        name: 'Отчет по переносам',
        icon: 'fas fa-people-carry',
        url: 'carry-reports'
      }
    ],
    toggled: false,
    app: null,
    notificationState: false
  },
  getters: {
    sidebarMenu(state) {
      return state.sidebarMenu;
    },
    toggled(state) {
      return state.toggled;
    },
    apps(state) {
      return state.apps;
    },
    parks(state) {
      return state.parks;
    },
    types(state) {
      return state.types;
    },
    app(state) {
      return state.app;
    },
    notificationState(state) {
      return state.notificationState;
    }
  },
  mutations: {
    toggle(state) {
      state.toggled = !state.toggled;
    },
    setApps(state, apps) {
      state.apps = apps;
    },
    setParks(state, parks) {
      state.parks = parks;
    },
    setTypes(state, types) {
      state.types = types;
    },
    setApp(state, id) {
      state.app = state.apps.find(item => item.appObjid === id);
    },
    deleteApp(state, id) {
      const indexToRemove = state.apps.findIndex(item => item.appObjid === id);
      state.apps = state.apps.slice(indexToRemove, 1);
    },
    setNotificationState(state) {
      state.notificationState = !state.notificationState;
    }
  },
  actions: {
    async setApps(context) {
      let {data} = await axios.get('http://localhost:9000/app/get', {
        headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
      });
      context.commit('setApps', data);
    },
    async setParks(context) {
      let {data} = await axios.get('http://localhost:9000/park/get', {
        headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
      });
      context.commit('setParks', data);
    },
    async setTypes(context) {
      let {data} = await axios.get('http://localhost:9000/appType/get', {
        headers: {'Authorization': 'Basic YWRtaW46YWRtaW4='}
      });
      context.commit('setTypes', data);
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

      axios.post('http://localhost:9000/app/save', data(),{
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4=',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        context.commit('setNotificationState');
        setTimeout(() => {
          context.commit('setNotificationState');
        }, 4000);
      });
    },
    deleteApp(context, payload) {
      console.log(payload)
      const data = {
        appObjid: payload
      };

      axios.post('http://localhost:9000/app/delete', data,{
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4=',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        context.commit('deleteApp', payload);
        context.commit('setNotificationState');
        setTimeout(() => {
          context.commit('setNotificationState');
        }, 4000);
      });
    }
  }
});
