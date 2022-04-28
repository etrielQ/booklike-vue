import { createRouter, createWebHashHistory } from "vue-router"
import store from "../store/index"

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/home.vue"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/register.vue"),
  },
  {
    name: "newBookmarkPage",
    path: "/new",
    component: () => import("@/views/newBookmark.vue"),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage"]
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"]
  const _isAuthenticated = store.getters._isAuthenticated
  console.log(to, from)

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated)
    next(false)

  if (authRequiredRoutes.indexOf(to.name) > -1 && !_isAuthenticated) {
    if (_isAuthenticated) next()
    else next({ name: "LoginPage" })
  } else {
    next()
  }
  // if (to.name === "HomePage" && _isAuthenticated) {
  //   next()
  // }
})

export default router
