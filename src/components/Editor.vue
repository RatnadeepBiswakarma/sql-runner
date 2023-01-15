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
      <!-- saved queries -->
      <div class="mt-2">Saved Queries</div>

      <p v-if="savedQueries.length === 0" class="no-queries color-secondary">
        No queries saved yet...
      </p>

      <ol
        v-else
        class="list-group-numbered list-group list-group-flush overflow-auto saved-list"
      >
        <li
          v-for="(query, idx) in savedQueries"
          :key="idx"
          class="color-secondary list-group-item p-0 d-flex"
        >
          <button
            type="button"
            class="btn btn-light w-100 text-start text-decoration-none py-0 rounded-0 ms-1 ps-1"
            @click="$emit('openSavedQuery', query)"
          >
            {{ query.name }}
          </button>
          <button
            type="button"
            class="btn btn-light p-0 me-2 rounded-0"
            @click="$emit('removeSavedQuery', query)"
          >
            <img
              src="https://icongr.am/feather/x.svg?size=18&color=9a9a9a"
              alt=""
            />
          </button>
        </li>
      </ol>
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
      <div class="d-flex justify-content-end w-100 text-end pt-2">
        <div class="save-query-div input-group input-group-sm me-3">
          <input
            v-model="name"
            type="text"
            class="form-control"
            aria-label="Query name"
            placeholder="Query name"
            aria-describedby="save-query"
          />
          <button
            id="save-query"
            type="button"
            class="btn btn-sm btn-outline-primary"
            @click="handleSaveClick"
          >
            Save Query
          </button>
        </div>
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
    savedQueries: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      name: '',
      dataSources: ['products', 'orders', 'customers'],
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('executeQuery')
    },
    handleSaveClick() {
      if (this.name) {
        this.$emit('saveQuery', this.name)
      }
    },
  },
}
</script>

<style scoped>
.saved-list {
  max-height: 10rem;
}

.save-query-div {
  max-width: 20rem;
}

.saved-list li button,
.no-queries {
  font-size: 0.9rem;
}

@media screen and (min-width: 648px) {
  .left-pane {
    width: 25%;
  }
  .editor-pane {
    width: 75%;
  }
}
</style>
