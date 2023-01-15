<template>
  <form
    class="d-flex flex-column flex-sm-row border"
    style="border-radius: 0 4px 4px 4px"
    @submit.prevent="handleSubmit"
  >
    <div class="left-pane py-2 ps-4 pe-4 border-end">
      <label for="data-source" class="form-label">Data Source</label>
      <select
        id="data-source"
        required
        class="form-select form-select-sm color-secondary"
        aria-label="Select Data Source"
        @input="$emit('selected', $event)"
      >
        <option value="">Select Data Source</option>
        <option
          v-for="option in dataSources"
          :key="option"
          :value="option"
          :selected="selectedOption === option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="editor-pane mt-2 mb-2 mx-4">
      <label for="sql-query" class="form-label">SQL Query</label>
      <textarea
        class="form-control color-secondary"
        id="sql-query"
        required
        rows="8"
        placeholder="Enter SQL query"
        :value="sqlQueryValue"
        @input="$emit('sqlQueryInput', $event.target.value)"
      ></textarea>
      <div class="w-100 text-end pt-2">
        <button type="submit" class="btn btn-sm btn-primary">
          Execute Query
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    selectedOption: {
      type: String,
      default: '',
    },
    sqlQueryValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataSources: ['products', 'orders', 'customers'],
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('executeQuery')
    },
  },
}
</script>

<style scoped>
@media screen and (min-width: 648px) {
  .left-pane {
    width: 25%;
  }
  .editor-pane {
    width: 75%;
  }
}
</style>
