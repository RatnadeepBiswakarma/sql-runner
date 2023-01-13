<template>
  <li
    class="nav-item d-flex justify-content-start align-items-center position-relative"
  >
    <button
      class="nav-link pe-4"
      :class="{ active }"
      id="home-tab"
      type="button"
      role="tab"
      @click="$emit('select', tab)"
    >
      <slot />
    </button>

    <button
      v-if="allowRemoval"
      type="button"
      class="close-btn btn btn-light rounded-circle d-flex justify-content-center align-items-center p-0"
      style="width: 20px; height: 20px"
      @click="$emit('handleTabRemove', tab)"
    >
      <img
        src="https://icongr.am/feather/x.svg?size=16&color=currentColor"
        alt=""
      />
    </button>
  </li>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tab: {
      type: Object,
      required: true,
    },
    allowRemoval: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.nav-item .close-btn {
  position: absolute;
  top: 50%;
  right: 0.3rem;
  transform: translateY(-50%);
}

.nav-link {
  padding: 0.3rem 1.5rem 0.3rem 0.8rem;
}
</style>
