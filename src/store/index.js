import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      name: ''
  },
  mutations: {
       name (state, payload) {
          // mutate state
          state.name = payload
      }
  },
  actions: {

  },
  modules: {

  }
})
