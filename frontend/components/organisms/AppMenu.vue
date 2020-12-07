<script>
export default {
  data () {
    return {
      options: [
        {
          label: 'Print',
          id: 'print'
        },
        {
          label: 'Write',
          id: 'write'
        }
      ]
    }
  }
}
</script>

<template>
  <menu class="app-menu">
    <button
      v-for="option in options"
      :key="option.id"
      @click="$emit('selection', option.id)"
    >
      {{ option.label }}
    </button>
  </menu>
</template>

<style>
.app-menu {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  background-color: var(--bg-col);
  border-right: var(--ln) solid var(--fg-col);
}

.app-menu > button {
  width: 100%;
  padding: calc(0.5 * var(--un)) var(--un);
  font: var(--base-font);
  font-weight: 700;
  text-align: left;
  background: none;
  border: none;
  border-bottom: var(--ln) solid var(--fg-col);
  border-radius: 0;
  cursor: pointer;
}

.app-menu > button:hover {
  text-decoration: underline;
}
</style>