import { reactive } from "vue";

function setCartQuantity() {
  if (localStorage.getItem("cartDishes")) {
    const dishes = JSON.parse(localStorage.getItem("cartDishes"));
    let quantity = 0;
    dishes.forEach((dish) => {
      quantity += dish.quantity;
    });
    return quantity;
  }

  return 0;
}

export const store = reactive({
  cartQuantity: setCartQuantity(),
});
