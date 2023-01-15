import { createStore } from 'vuex'

// Feel free to divide the store into modules as the app grows
export default createStore({
  state: {
    savedQueries: [
      {
        name: 'Get all customers',
        id: 'savedQuery1',
        dataSets: [],
        source: 'customers',
        sqlQuery: 'SELECT * FROM customers;',
      },
    ],
    tabs: [
      {
        name: 'Query 1',
        id: 'defaulttab',
        dataSets: [],
        source: 'products',
        sqlQuery: 'SELECT * FROM products;',
      },
      {
        name: 'Query 3',
        id: 'defaulttab3',
        dataSets: [],
        source: 'orders',
        sqlQuery: 'SELECT * FROM orders;',
      },
    ],
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
    setSqlQuery(state, { id, sqlQuery }) {
      const tab = state.tabs.find((t) => t.id === id)
      if (tab) {
        tab.sqlQuery = sqlQuery
      }
    },
    setQuery(state, payload) {
      state.savedQueries.push(payload)
    },
    deleteSavedQuery(state, id) {
      state.savedQueries = state.savedQueries.filter((q) => q.id !== id)
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
    updateSqlQuery({ commit }, payload) {
      commit('setSqlQuery', payload)
    },
    saveQuery({ commit }, payload) {
      commit('setQuery', payload)
    },
    removeSavedQuery({ commit }, id) {
      commit('deleteSavedQuery', id)
    },
  },
})
