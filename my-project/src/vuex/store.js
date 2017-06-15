import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 20
  },
  mutations: {
    INCREMENT (state) {
      state.count++;
    },
    DECREMENT (state) {
      state.count--;
    }
  },
  actions: {
    increment ({commit}) {
      commit('INCREMENT');
    },
    decrement ({commit}) {
      commit('DECREMENT');
    }
  }
});
export default store;

