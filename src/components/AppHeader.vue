<script>
import { store } from "../store.js";
export default {
  name: "AppHeader",
  computed: {
    getCartQuantity() {
      return store.cartQuantity;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.scrollToTop();
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-md navbar-light bg-white shadow-sm"
    id="nav-fix"
  >
    <div class="container">
      <RouterLink
        class="navbar-brand d-flex align-items-center"
        id="navbar"
        :to="{ name: 'home' }"
        @click="scrollToTop()"
      >
        <figure class="m-0">
          <img
            class="logo-nav position-static"
            src="../assets/img/icon-logo.jpg"
            alt=""
          />
        </figure>
        <span class="green-title fw-bold">Delive</span
        ><span class="blue-title fw-bold">Boo</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="{{ __('Toggle navigation') }}"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'home' }"
              class="nav-link"
              @click="scrollToTop()"
            >
              Home
            </RouterLink>
          </li>
        </ul>
        <div class="d-flex gap-4">
          <a
            class="btn btn-orange log-btn py-1 px-3"
            href="http://127.0.0.1:8000/login"
          >
            <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
          </a>
          <RouterLink
            :to="{ name: 'checkout' }"
            class="btn btn-orange log-btn py-1 px-3 cart"
            href="#"
            @click="scrollToTop()"
          >
            <font-awesome-icon
              icon="fa-solid fa-cart-shopping"
            ></font-awesome-icon>
            <div
              class="cart-badge d-flex justify-content-center align-items-center"
            >
              <span>{{ getCartQuantity }}</span>
            </div>
          </RouterLink>
        </div>

        <!-- Right Side Of Navbar -->
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

#nav-fix {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

#navbar {
  font-size: 25px;
}

.green-title {
  color: $bg-primary;
}

.blue-title {
  color: $secondary-color;
}

.logo-nav {
  height: 50px;
  position: relative;
  top: 8px;
  // margin-top: 15px;
}

.log-btn {
  font-size: 1.09rem;
  position: relative;

  .cart-badge {
    position: absolute;
    top: -1%;
    right: 3%;
    background-color: black;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    width: 20px;
    height: 20px;
  }
}

.btn-orange {
  background-color: $bg-primary;
  color: white;
  border: 2px solid $bg-primary;
}

.btn-orange:hover {
  background-color: white;
  color: $bg-primary;
  border: 2px solid $bg-primary;
}
</style>
