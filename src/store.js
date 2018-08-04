import Vue from 'vue';
import Vuex from 'vuex';
import { getOpenLoans } from './contracts';

Vue.use(Vuex);

window.a = getOpenLoans;

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
