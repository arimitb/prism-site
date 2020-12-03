<template>
  <header class="app-header">
    <AppHeaderMenuIcon />
    <AppHeaderTopic />
    <AppHeaderSource />
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
  width: calc(2 * var(--un));
  height: calc(2 * var(--un));
  border-right: var(--ln) solid var(--fg-col);
}

.app-header-topic {
  border-right: var(--ln) solid var(--fg-col);
}

.app-header-source {
  flex-grow: 1;
}
</style>