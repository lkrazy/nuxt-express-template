<template lang="pug">
  a-layout#components-layout-demo-top.layout
    app-menu
    a-layout-content(style="padding: 0 50px")
      a-breadcrumb(style="margin: 16px 0")
        a-breadcrumb-item Home
        a-breadcrumb-item List
        a-breadcrumb-item App
      nuxt
    a-layout-footer(style="text-align: center")
      my-footer
</template>

<script>
  import AppMenu from '~/components/AppMenu'
  import MyFooter from '~/components/Footer.vue'

  export default {
    components: {
      MyFooter,
      AppMenu
    }
  }
</script>

<style lang="stylus">
  .container
    margin: 0;
    width: 100%;
    text-align: center;


  .button, .button:visited
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;

  .button:hover, .button:focus
    color: #fff;
    background-color: #000;

  .title
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;

  #components-layout-demo-top
    min-height: 100vh
    .logo
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
</style>
