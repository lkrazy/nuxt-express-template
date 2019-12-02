<template lang="pug">
  section.container
    img.logo(src="~assets/img/logo.png" alt="Nuxt.js Logo")
    h1.title
      | USERS
    ul.users
      li.user(v-for="(user, index) in users" :key="index")
        nuxt-link(:to="{ name: 'id', params: { id: index }}")
          | {{ user.name }}
    a-button
      | Hello
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    components: {
    },
    async asyncData() {
      let {data} = await axios.get('/api/users')
      return {users: data}
    },
    head() {
      return {
        title: 'Users'
      }
    }
  }
</script>

<style scoped>
  .title {
    margin: 30px 0;
  }

  .users {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .user {
    margin: 10px 0;
  }
</style>
