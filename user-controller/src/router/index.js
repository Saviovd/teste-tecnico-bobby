import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserManagementView from "@/views/UserManagementView.vue";
import { isAuthenticated } from "@/utils/auth";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: "/users",
    name: "UserManagement",
    component: UserManagementView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
