<template>
  <a-menu v-model="current" mode="horizontal">
    <a-menu-item key="home">
      <a-icon type="appstore">
      </a-icon>
      Home
    </a-menu-item>
  </a-menu>

</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        current: ['home']
      }
    }
  }
</script>

<style scoped>

</style>
