<template>
  <table class="table">
    <thead>
      <tr>
        <slot name="headers" :headers="headers">
          <th v-if="headers.length > 0" class="col">#</th>
          <th v-for="(th, idx) in headers" :key="idx + '_th'" class="col">
            {{ th }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in rows" :key="idx + '_tr'">
        <slot name="row" :row="row">
          <td class="fw-bold">{{ idx + 1 }}</td>
          <td v-for="cell in headers" :key="cell + '_tr'">{{ row[cell] }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  computed: {
    headers() {
      return this.rows.length > 0 ? Object.keys(this.rows[0]) : []
    },
  },
}
</script>
