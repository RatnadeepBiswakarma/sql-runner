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
        :selectedOption="getSelectedSource"
        :sqlQueryValue="getActiveTab.sqlQuery"
        :savedQueries="savedQueries"
        @selected="handleSourceSelect"
        @sqlQueryInput="handleSqlInput"
        @openSavedQuery="handleOpenSavedQueryClick"
        @removeSavedQuery="handleRemoveSavedQueryClick"
        @saveQuery="handleSaveQuery"
        @executeQuery="executeQuery"
      />
    </div>
    <div class="results-container card mt-2 p-2">
      <div class="w-100 text-end py-2 px-3 d-flex justify-content-between">
        <h2 class="fs-6 fw-bold">Query Result</h2>
        <div class="d-flex">
          <div class="input-group">
            <select
              class="form-select form-select-sm format-select"
              aria-label="Select data set format"
            >
              <option selected value="json">JSON</option>
              <option disabled value="">CSV (coming soon)</option>
            </select>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              :disabled="getActiveTab.dataSets.length === 0"
              @click="downloadDataSet"
            >
              Download Data Set
            </button>
          </div>
        </div>
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
      dataSource: '',
      activeTabId: 'defaulttab',
    }
  },
  computed: {
    ...mapState(['tabs', 'dataSets', 'savedQueries']),
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
      return this.getActiveTab.source || this.dataSource
    },
  },
  methods: {
    ...mapActions([
      'createTab',
      'removeTab',
      'addDataSet',
      'addTabSource',
      'updateSqlQuery',
      'saveQuery',
      'removeSavedQuery',
    ]),
    selectTab(tab) {
      this.activeTabId = tab.id
    },
    handleSqlInput(sqlQuery) {
      this.updateSqlQuery({ id: this.activeTabId, sqlQuery })
    },
    handleSaveQuery(name) {
      this.saveQuery({
        id: uniqid(),
        name,
        dataSets: [],
        source: this.getSelectedSource,
        sqlQuery: this.getActiveTab.sqlQuery,
      })
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
    handleOpenSavedQueryClick(query) {
      const id = uniqid() // generate new id to avoid tabs with same id
      this.createTab({ ...query, id })
      this.selectTab({ id })
    },
    handleRemoveSavedQueryClick({ id }) {
      this.removeSavedQuery(id)
    },
    handleTabRemove(tab) {
      this.removeTab(tab)
      if (tab.id === this.activeTabId) {
        this.activeTabId = this.tabs[0].id
      }
    },
    handleSourceSelect(evt) {
      this.dataSource = evt.target.value
      this.addTabSource({
        id: this.activeTabId,
        source: this.dataSource,
      })
    },
    executeQuery() {
      this.getData(this.getSelectedSource)
    },
    downloadDataSet() {
      // https://stackoverflow.com/a/30800715/10225466
      const data = `data:text/json;charset=utf-8,
        ${encodeURIComponent(JSON.stringify(this.getActiveDataSetList))}`
      const el = document.createElement('a')
      el.setAttribute('href', data)
      el.setAttribute('download', `${this.getSelectedSource}.json`)
      el.click()
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
.results-container {
  max-height: calc(100vh - 27.5rem);
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
  transform: translateZ(0);
}

select.format-select {
  max-width: 2rem;
  color: #0d6efd;
  border-color: #0d6efd;
}
</style>
