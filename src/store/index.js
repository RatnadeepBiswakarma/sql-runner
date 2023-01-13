import { createStore } from 'vuex'

// Feel free to divide the store into modules as the app grows
export default createStore({
  state: {
    tabs: [{ name: 'New Query', id: 'defaulttab' }],
  },
  mutations: {
    createTab(state, tab) {
      state.tabs = [...state.tabs, tab]
    },
    removeTab(state, tab) {
      state.tabs = state.tabs.filter((t) => t.id !== tab.id)
    },
  },
  actions: {
    createTab({ commit }, tab) {
      commit('createTab', tab)
    },
    removeTab({ commit }, tab) {
      commit('removeTab', tab)
    },
  },
})
