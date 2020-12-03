<template>
  <div class="app-header-topic">
    <BackIcon />
    <h2 class="fg-col no-margin">CAA/NRC</h2>
  </div>
</template>

<style>
.app-header-topic {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 calc(1 * var(--un));
  overflow: hidden;
  cursor: pointer;
}

.app-header-topic > .back-icon {
  width: calc(0.3 * var(--un));
  height: calc(0.3 * var(--un));
  margin-right: calc(0.5 * var(--un));
  transition: transform 0.2s;
}

.app-header-topic:hover > .back-icon {
  transform: translateX(calc(-0.25 * var(--un)));
}
</style>