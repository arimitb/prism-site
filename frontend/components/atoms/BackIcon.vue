<template>
  <div class="back-icon">
    <div></div>
  </div>
</template>

<style>
.back-icon {
  width: calc(0.5 * var(--un));
  height: calc(0.5 * var(--un));
}
.back-icon > div {
  width: 100%;
  height: 100%;
  transform: rotate(-45deg);
  border-top: var(--ln) solid var(--fg-col);
  border-left: var(--ln) solid var(--fg-col);
}
</style>