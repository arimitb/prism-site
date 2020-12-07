<template>
  <button class="app-header-menu-icon">
    <div class="app-header-menu-icon-handle"></div>
    <div class="app-header-menu-icon-handle"></div>
    <div class="app-header-menu-icon-handle"></div>
  </button>
</template>

<style>
.app-header-menu-icon {
  position: relative;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
}

.app-header-menu-icon-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--un);
  height: var(--ln);
  background-color: var(--fg-col);
}

.app-header-menu-icon-handle:first-child {
  transform: translate(-50%, calc(-50% - (0.25 * var(--un))));
}

.app-header-menu-icon-handle:last-child {
  transform: translate(-50%, calc(-50% + (0.25 * var(--un))));
}

.app-header-menu-icon-handle:first-child, .app-header-menu-icon-handle:last-child {
  transition: transform 0.2s;
}

.app-header-menu-icon:hover > .app-header-menu-icon-handle:first-child {
  transform: translate(-50%, calc(-50% - (0.35 * var(--un))));
}

.app-header-menu-icon:hover > .app-header-menu-icon-handle:last-child {
  transform: translate(-50%, calc(-50% + (0.35 * var(--un))));
}
</style>