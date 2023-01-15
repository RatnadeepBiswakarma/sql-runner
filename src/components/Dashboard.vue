<template>
  <div class="p-3" style="background-color: #d4d4d459">
    <div class="card p-2 bg-white">
      <h1 class="fs-5 text-center mb-0">SQL Runner</h1>
      <h2 class="fs-6 fw-bold ms-2">All Tabs</h2>
      <ul
        class="nav nav-tabs d-flex justify-content-start align-items-center border-bottom-0"
      >
        <TabButton
          v-for="tab in tabs"
          :key="tab.id"
          :tab="tab"
          :active="tab.id === getActiveTab.id"
          :allowRemoval="tabs.length > 1"
          @select="selectTab"
          @handleTabRemove="handleTabRemove"
          >{{ tab.name }}</TabButton
        >
        <button
          type="button"
          class="btn btn-light rounded-circle d-flex justify-content-center align-items-center ms-2"
          style="width: 30px; height: 30px"
          @click="addNewTab"
        >
          <img
            src="https://icongr.am/feather/plus.svg?size=20&color=currentColor"
            alt=""
          />
        </button>
      </ul>
      <Editor
        @selected="handleSourceSelect"
        :selectedOption="getSelectedSource"
        @sqlQueryInput="handleSqlInput"
        :sqlQueryValue="getActiveTab.sqlQuery"
        @executeQuery="executeQuery"
      />
    </div>
    <div class="card mt-2">
      <div class="w-100 text-end py-2 px-3 d-flex justify-content-between">
        <h2 class="fs-6 fw-bold">Query Result</h2>
        <button type="button" class="btn btn-sm btn-outline-primary">
          Download Data Set
        </button>
      </div>
      <div class="table-container">
        <Table :rows="getActiveDataSetList" class="table-striped table-sm" />
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import TabButton from '@/components/TabButton.vue'
import uniqid from 'uniqid'
import { mapActions, mapState } from 'vuex'
import Table from '@/components/Table.vue'

export default {
  components: { Editor, TabButton, Table },
  data() {
    return {
      currentDataSource: '',
      activeTabId: 'defaulttab',
    }
  },
  computed: {
    ...mapState(['tabs', 'dataSets']),
    getActiveTab() {
      return this.tabs.find((t) => t.id === this.activeTabId)
    },
    getActiveDataSetList() {
      return this.getActiveTab.dataSets.length > 0
        ? this.getActiveTab.dataSets
        : this.getEmptyTableList
    },
    getEmptyTableList() {
      return Array(20).fill({ '': '' })
    },
    getSelectedSource() {
      return this.getActiveTab.source || ''
    },
  },
  methods: {
    ...mapActions([
      'createTab',
      'removeTab',
      'addDataSet',
      'addTabSource',
      'updateSqlQuery',
    ]),
    selectTab(tab) {
      this.activeTabId = tab.id
    },
    handleSqlInput(sqlQuery) {
      this.updateSqlQuery({ id: this.activeTabId, sqlQuery })
    },
    addNewTab() {
      const id = uniqid()
      this.createTab({
        name: `Query ${this.tabs.length + 1}`,
        id,
        dataSets: [],
        source: '',
        sqlQuery: '',
      })
      this.activeTabId = id
    },
    handleTabRemove(tab) {
      this.removeTab(tab)
      if (tab.id === this.activeTabId) {
        this.activeTabId = this.tabs[0].id
      }
    },
    handleSourceSelect(evt) {
      this.currentDataSource = evt.target.value
      this.addTabSource({
        id: this.activeTabId,
        source: this.currentDataSource,
      })
    },
    executeQuery() {
      this.getData(this.currentDataSource)
    },
    getData(source) {
      fetch(
        `https://raw.githubusercontent.com/RatnadeepBiswakarma/json-db/main/${source}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          const id = this.activeTabId
          this.addDataSet({
            id,
            data,
          })
        })
    },
  },
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-width: 100%;
  max-height: 93vh;
  transform: translateZ(0);
}
</style>
