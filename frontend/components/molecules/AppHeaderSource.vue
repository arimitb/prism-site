<script>
export default {
  props: {
    sourceTitle: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<template>
  <div class="app-header-source">
    <h2 class="no-margin">{{ sourceTitle }}</h2>
  </div>
</template>

<style scoped>
.app-header-source {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: var(--un);
  color: var(--bg-col);
  background-color: var(--fg-col);
  white-space: nowrap;
}

.app-header-source > h2::before {
  content: 'Source: '
}
</style>