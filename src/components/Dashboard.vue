<template>
  <div class="p-2">
    <h1 class="fs-4 text-center">SQL Runner</h1>
    <div class="card p-2">
      <h2 class="fs-6 fw-bold ms-2">All Tabs</h2>
      <ul class="nav nav-tabs d-flex justify-content-start align-items-center">
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
      <Editor />
      <!--  -->
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import TabButton from '@/components/TabButton.vue'
import uniqid from 'uniqid'
import { mapActions, mapState } from 'vuex'

export default {
  components: { Editor, TabButton },
  data() {
    return {
      activeTabId: 'defaulttab',
    }
  },
  computed: {
    ...mapState(['tabs']),
    getActiveTab() {
      return this.tabs.find((t) => t.id === this.activeTabId)
    },
  },
  methods: {
    ...mapActions(['createTab', 'removeTab']),
    selectTab(tab) {
      this.activeTabId = tab.id
    },
    addNewTab() {
      const id = uniqid()
      this.createTab({ name: 'New Query', id })
      this.activeTabId = id
    },
    handleTabRemove(tab) {
      this.removeTab(tab)
      if (tab.id === this.activeTabId) {
        this.activeTabId = this.tabs[0].id
      }
    },
  },
}
</script>

<style scoped>
/*  */
</style>
