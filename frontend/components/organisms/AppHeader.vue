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
  <header class="app-header">
    <AppHeaderMenuIcon @click.native="$emit('menu-click')" />
    <AppHeaderTopic />
    <AppHeaderSource
      :sourceTitle="sourceTitle"
    />
  </header>
</template>

<style>
.app-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  background-color: var(--bg-col);
  border-bottom: var(--ln) solid var(--fg-col);
}

.app-header > .app-header-menu-icon {
  flex-shrink: 0;
  width: calc(2 * var(--un));
  height: 100%;
  border-right: var(--ln) solid var(--fg-col);
}

.app-header-topic {
  flex-shrink: 0;
  border-right: var(--ln) solid var(--fg-col);
}

.app-header-source {
  flex-grow: 1;
}
</style>