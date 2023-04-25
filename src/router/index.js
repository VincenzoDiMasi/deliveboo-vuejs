// importo le funzioni di vue router
import { createRouter, createWebHistory } from "vue-router";

// importo le pagine che voglio usare
import HomePage from "../pages/HomePage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import MenuPage from "../pages/MenuPage.vue";
import PaymentPage from "../pages/PaymentForm.vue";
import CartPage from "../pages/CartPage.vue";
import ThankYouPage from "../pages/ThankYouPage.vue";
import ErrorOrderPage from "../pages/ErrorOrderPage.vue";

// creiamo il router e definiamo le rotte
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurants/:slug",
      name: "menu",
      component: MenuPage,
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CartPage,
    },

    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPage },

    { path: "/thankyou", name: "thank-you-page", component: ThankYouPage },

    { path: "/error", name: "error-order-page", component: ErrorOrderPage },
  ],
});

export { router };
