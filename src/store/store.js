import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import modules from './modules';

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
        url: 'graphs'
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
  modules
});
