<template>
  <nav
    v-if="$store.state.user"
    class="navbar fixed-top navbar-expand-lg navbar-light bg-light"
  >
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
        >Tawi Libray App</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarScroll"
      >
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        ></ul>
        <form class="d-flex">
          <button
            class="btn btn-danger btn-sm"
            @click="$store.dispatch('logout')"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch("fetchUser")
    })
  },
}
</script>

<style></style>
