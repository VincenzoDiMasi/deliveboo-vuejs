<script>
export default {
  name: "Braintree",
  emits: ["returnToForm"],
  mounted() {
    const button = document.getElementById("verify-button");
    const goBackButton = document.getElementById("go-back");
    const payButton = document.getElementById("submit-button");

    // Braintree function
    braintree.dropin.create(
      {
        // Insert your tokenization key here
        authorization: "sandbox_cscchrw5_543rbwhrbh3s9sk5",
        container: "#dropin-container",
      },
      function (createErr, instance) {
        button.addEventListener("click", function () {
          instance.requestPaymentMethod(function (
            requestPaymentMethodErr,
            payload
          ) {
            // When the user clicks on the 'Submit payment' button this code will send the
            // encrypted payment information in a variable called a payment method nonce
            if (payload) {
              button.style.display = "none";
              goBackButton.style.display = "none";
              payButton.style.display = "block";
            }
          });
        });
      }
    );
  },
};
</script>

<template>
  <div class="card-body">
    <div id="dropin-container"></div>
    <div class="d-flex">
      <button
        @click="$emit('returnToForm')"
        type="button"
        id="go-back"
        class="btn btn-sm btn-danger fw-semibold text-white">
        Indietro
      </button>
      <button
        type="button"
        id="verify-button"
        class="btn btn-sm btn-success indietro fw-semibold text-white ms-3">
        Verifica carta
      </button>
      <button
        type="submit"
        id="submit-button"
        class="btn btn-sm btn-success indietro fw-semibold text-white mt-3">
        Paga
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn.btn-primary {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-image: linear-gradient(
    to right,
    #77a1d3 0%,
    #79cbca 51%,
    #77a1d3 100%
  );
  border: none;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn.btn.btn-primary:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.btn.btn-primary:hover .icon {
  transform: scale(1.5);
  transition: transform 0.2s ease-in;
}

#submit-button {
  display: none;
}
</style>
