<template>
  <div class="custom-login-container">
    <h3 class="text-center">Login</h3>
    <br />
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Email Address"
          v-model="login_form.email"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter Password"
          v-model="login_form.password"
        />
      </div>
      <div class="d-flex justify-content-between">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Login
        </button>
        <router-link to="/signup">Signup</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    const login_form = ref({})
    const store = useStore()

    const login = () => {
      store.dispatch("login", login_form.value)
    }

    return {
      login_form,
      login,
    }
  },
}
</script>

<style scoped>
.custom-login-container {
  margin: 0 auto;
  margin-top: 7rem;
  width: 450px;
  padding: 0.5rem;
}
</style>
