import { createStore } from 'vuex'

// Feel free to divide the store into modules as the app grows
export default createStore({
  state: {
    tabs: [{ name: 'Query 1', id: 'defaulttab' }],
    dataSets: {},
  },
  mutations: {
    setTab(state, tab) {
      state.tabs = [...state.tabs, tab]
    },
    removeTab(state, tab) {
      state.tabs = state.tabs.filter((t) => t.id !== tab.id)
    },
    setDataSet(state, data) {
      state.dataSets = { ...state.dataSets, ...data }
    },
    removeDataSet(state, id) {
      const localCopy = { ...state.dataSets }
      delete localCopy[id]
      state.dataSets = localCopy
    },
  },
  actions: {
    createTab({ commit }, tab) {
      commit('setTab', tab)
    },
    removeTab({ commit }, tab) {
      commit('removeTab', tab)
      commit('removeDataSet', tab.id)
    },
    addDataSet({ commit }, data) {
      commit('setDataSet', data)
    },
  },
})
