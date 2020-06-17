import Vue from 'vue'
import Vuex from 'vuex'
import client from '@/services/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    login({ commit }, credentials) {
      return client.post('/auth', credentials).then(({ data }) => {
        commit('SET_USER_DATA', data)
      })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    },
    name(state) {
      return state.user.username
    }
  },
  modules: {}
})
