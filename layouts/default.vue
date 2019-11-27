<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <app-menu/>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <nuxt/>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <my-footer/>
    </a-layout-footer>
  </a-layout>
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

<style>
.container
{
  margin: 0;
  width: 100%;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
