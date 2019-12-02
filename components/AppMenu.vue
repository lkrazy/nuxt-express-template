<template lang="pug">
  a-layout-header
    img.logo(src="~assets/img/logo.png" alt="Nuxt.js Logo")
    a-menu(theme="dark" mode="horizontal" :defaultSelectedKeys="['2']" :style="{ lineHeight: '64px' }")
      a-menu-item(key="1") nav 1
      a-menu-item(key="2") nav 2
      a-menu-item(key="3") nav 3
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

<style scoped lang="stylus">
  .logo
    float left
</style>
