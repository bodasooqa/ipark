import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const appModule = {
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
      let {data} = await axios.get('http://localhost:9000/app/get', {
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

      axios.post('http://localhost:9000/app/save', data(),{
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

      axios.post('http://localhost:9000/app/delete', data,{
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
    }
  }
};

export default new Vuex.Store({
  state: {
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
    toggled: false
  },
  getters: {
    sidebarMenu(state) {
      return state.sidebarMenu;
    },
    toggled(state) {
      return state.toggled;
    }
  },
  mutations: {
    toggle(state) {
      state.toggled = !state.toggled;
    }
  },
  modules: {
    appModule
  }
});
