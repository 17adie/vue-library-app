<template>
  <navBar></navBar>
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue"

export default {
  components: {
    navBar: NavBar,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
