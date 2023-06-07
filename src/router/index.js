import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import SignupView from "../views/SignUpView.vue"
import EditView from "../views/EditView.vue"
import { auth } from "../firebase"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: EditView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// for routing authentication when login/not login
router.beforeEach((to, from, next) => {
  // redirect to home page when logged in
  if (to.path === "/login" && auth.currentUser) {
    next("/")
    return
  }

  // not login redirect to login page
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    next("/login")
    return
  }

  next()
})

export default router
