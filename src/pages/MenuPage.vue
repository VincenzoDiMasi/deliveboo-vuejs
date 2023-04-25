<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "MenuPage",
  data() {
    return {
      restaurant: {},
      dishes: [],
      cartDishes: [],
      cartRestaurantName: "",
    };
  },
  watch: {
    cartDishes: {
      handler(newValue) {
        if (this.addToLocalCart()) {
          localStorage.setItem("cartDishes", JSON.stringify(newValue));
          const cartQuantity = newValue.reduce(
            (total, dish) => total + dish.quantity,
            0
          );
          store.cartQuantity = cartQuantity;
          if (!cartQuantity) localStorage.clear();
        }
      },
      deep: true,
    },
  },
  methods: {
    addToCart(dish) {
      const cartDish = this.cartDishes.find(
        (cartDish) => cartDish.id === dish.id
      );
      if (cartDish) {
        this.incrementQuantity(cartDish);
      } else {
        dish.quantity = 1;
        dish.addedToCart = true;
        const newCartDish = { ...dish };
        this.cartDishes.push(newCartDish);
        this.addToLocalCart();
      }
    },
    incrementQuantity(dish) {
      dish.quantity++;
      const cartDish = this.cartDishes.find(
        (cartDish) => cartDish.id === dish.id
      );
      cartDish.quantity++;
    },
    decrementQuantity(dish) {
      const cartDish = this.cartDishes.find(
        (cartDish) => cartDish.id === dish.id
      );
      if (dish.quantity > 1) {
        dish.quantity--;
        cartDish.quantity--;
      } else {
        dish.addedToCart = false;
        dish.quantity = 0;
        const i = this.cartDishes.indexOf(cartDish);
        this.cartDishes.splice(i, 1);
      }
    },
    addToLocalCart() {
      const restaurantName = this.restaurant.slug;
      if (!localStorage.getItem("restaurantName")) {
        localStorage.setItem("restaurantName", restaurantName);
      } else if (localStorage.getItem("restaurantName") !== restaurantName) {
        this.cartRestaurantName = localStorage.getItem("restaurantName");
        return false;
      }
      return true;
    },
    setCartDishes() {
      const localRestaurantName = localStorage.getItem("restaurantName");
      if (
        localRestaurantName &&
        localRestaurantName === this.restaurant.slug &&
        localStorage.getItem("cartDishes")
      ) {
        const localCartDishes = JSON.parse(localStorage.getItem("cartDishes"));
        localCartDishes.forEach((localDish) => {
          const dish = this.dishes.find((dish) => dish.id === localDish.id);
          dish.quantity = localDish.quantity;
          dish.addedToCart = true;
          this.cartDishes.push({ ...dish });
        });
      }
    },
    clearStorage() {
      localStorage.clear();
      store.cartQuantity = 0;
      this.cartRestaurantName = "";
      localStorage.setItem("cartDishes", JSON.stringify([this.cartDishes[0]]));
      localStorage.setItem("restaurantName", this.restaurant.slug);
      store.cartQuantity = 1;
    },
  },

  mounted() {
    // this.$refs.myFocus.focus();
    const slug = this.$route.params.slug;

    axios
      .get(`http://127.0.0.1:8000/api/restaurants/${slug}`)
      .then((res) => {
        this.restaurant = res.data.restaurant;
        this.dishes = res.data.dishes.map((dish) => {
          return {
            ...dish,
            addedToCart: false,
            quantity: 0,
          };
        });
        this.setCartDishes();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // created() {
  //   console.log(this.$route.params.slug);
  // },
};
</script>
<template>
  <div class="container py-4">
    <h1
      class="text-center fw-bold text-white text-capitalize mt-3 mb-3"
      id="myFocus">
      "{{ restaurant.name }}"
    </h1>
    <h1 class="text-center text-white fw-bold mb-4 d-none d-md-block">Menù</h1>
    <div
      class="row d-flex flex-column justify-content-center align-items-center">
      <div class="alert-overlay" v-if="cartRestaurantName">
        <div class="alert alert-light col-5 text-center fw-bold" role="alert">
          Attenzione! Non puoi effettuare acquisti da ristoranti diversi.
          <div class="d-flex justify-content-around mt-3">
            <a
              type="button"
              :href="`http://localhost:5174/restaurants/${cartRestaurantName}`"
              class="btn btn-success">
              Continua ad Acquistare
            </a>
            <button type="button" class="btn btn-danger" @click="clearStorage">
              Svuota Carrello
            </button>
          </div>
        </div>
      </div>
      <div
        class="col-12 d-flex justify-content-center col-sm-10 col-md-12 col-lg-8 col-xl-7 col-xxl-6 mb-4"
        v-for="dish in dishes"
        :key="dish.id">
        <div class="card h-100">
          <div class="row g-0">
            <div class="col-md-4 p-2">
              <img
                v-if="dish.image"
                :src="dish.image"
                class="img-fluid rounded h-100"
                alt="..." />
              <img
                v-else
                src="https://www.salepepe.it/files/2019/06/cibo-spazzatura-@salepepe.jpg"
                class="img-fluid rounded-start"
                alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h4 class="card-title text-capitalize">{{ dish.name }}</h4>
                <p class="card-text">{{ dish.description }}</p>
                <p class="badge text-bg-success">€ {{ dish.price }}</p>
                <div class="d-flex justify-content-end">
                  <button
                    v-if="!dish.addedToCart"
                    class="btn btn-success"
                    @click="addToCart(dish)">
                    Aggiungi al carrello
                  </button>
                  <div
                    v-if="dish.addedToCart"
                    class="d-flex align-items-center">
                    <button
                      class="btn btn-danger me-2"
                      @click="decrementQuantity(dish)">
                      -
                    </button>
                    <span id="counter" class="me-2">{{ dish.quantity }}</span>
                    <button
                      class="btn btn-success"
                      @click="incrementQuantity(dish)">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/variables.scss";

#myFocus {
  font-size: 50px;
}

.card-title {
  min-height: 48px;
}

.card {
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

#counter {
  font-size: 20px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  //   color: rgb(218, 150, 24);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #eeaf5e, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

@media (min-width: 1440px) {
  .card {
    width: 700px;
  }
}
</style>
