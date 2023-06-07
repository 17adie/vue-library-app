<template>
  <div class="custom-signup-container">
    <h3 class="text-center">Signup</h3>
    <br />
    <form @submit.prevent="signup">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Email Address"
          v-model="signup_form.email"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter Password"
          v-model="signup_form.password"
        />
      </div>
      <div class="d-flex justify-content-between">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
        <router-link to="/login">back to login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { signUpValidations } from "./../validations"

export default {
  setup() {
    const signup_form = ref({})
    const store = useStore()

    const signup = () => {
      // validations
      const validation = signUpValidations(signup_form.value.password)

      // don't continue if false
      if (!validation) return

      store.dispatch("signup", signup_form.value)
    }

    return {
      signup_form,
      signup,
    }
  },
}
</script>

<style scoped>
.custom-signup-container {
  margin: 0 auto;
  margin-top: 7rem;
  width: 450px;
  padding: 0.5rem;
}
</style>
