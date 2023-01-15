import { createStore } from 'vuex'

// Feel free to divide the store into modules as the app grows
export default createStore({
  state: {
    tabs: [{ name: 'Query 1', id: 'defaulttab', dataSets: [], source: '' }],
  },
  mutations: {
    setTab(state, tab) {
      state.tabs = [...state.tabs, tab]
    },
    removeTab(state, tab) {
      state.tabs = state.tabs.filter((t) => t.id !== tab.id)
    },
    setDataSet(state, payload) {
      const tab = state.tabs.find((t) => t.id === payload.id)
      if (tab) {
        tab.dataSets = payload.data
      }
    },
    setTabSource(state, { id, source }) {
      const tab = state.tabs.find((t) => t.id === id)
      if (tab) {
        tab.source = source
      }
    },
  },
  actions: {
    createTab({ commit }, tab) {
      commit('setTab', tab)
    },
    removeTab({ commit }, tab) {
      commit('removeTab', tab)
    },
    addDataSet({ commit }, payload) {
      commit('setDataSet', payload)
    },
    addTabSource({ commit }, payload) {
      commit('setTabSource', payload)
    },
  },
})
