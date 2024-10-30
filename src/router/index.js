import Vue from "vue";
import VueRouter from "vue-router";
//import pinia from "@/stores/index.js
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import ChoiceView from "../views/ChoiceView.vue";

// import LoginView from "../views/LoginView.vue";
// import { useAuthStore } from "@/stores/auth.store.js";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/account/login",
  //   name: "LoginPage",
  //   component: LoginView,
  // },
  {
    path: "/",
    name: "home-view",
    component: HomeView,
    props: true,
  },
  {
    path: "/product",
    name: "product-view",
    component: ProductView,
    props: true,
  },
  {
    path: "/choice",
    name: "choice-view",
    component: ChoiceView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const authStore = useAuthStore(pinia);
//   const publicPages = ["/account/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const authenticated = authStore.token;

//   if (!authRequired && authenticated) {
//     return next();
//   }

//   if (authRequired && !authenticated) {
//     return next("/account/login");
//   }
//   return next();
// });
export default router;
