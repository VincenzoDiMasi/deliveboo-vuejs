<script>
import Braintree from "../components/Braintree.vue";
export default {
    name: 'PaymentForm',
    components: { Braintree },

    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                address: '',
                phone: '',
                payment_status: false,
                total_price: '',
                delivery_time: ''
            },
            showPayment: false
        };
    },
};

</script>

<template>
    <div class="container h-100 mt-4">
        <div class="card px-4 my-5">
            <p class="h8 py-3">COMPLETA IL TUO ORDINE</p>
            <form action="" @submit.prevent="">
                <div v-if="!showPayment" class="row gx-3">
                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Nome</p>
                            <input class="form-control mb-3" type="text" v-model="form.first_name">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Cognome</p>
                            <input class="form-control mb-3" type="text" v-model="form.last_name">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Email</p>
                            <input class="form-control mb-3" type="email" v-model="form.email">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Indirizzo</p>
                            <input class="form-control mb-3" type="text" v-model="form.address">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Telefono</p>
                            <input class="form-control mb-3" type="text" v-model="form.phone">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <p class="text mb-1">Orario Di Consegna</p>
                            <input class="form-control mb-3" type="time" v-model="form.delivery_time">
                        </div>
                    </div>

                    <div class="offset-md-8 col-md-4">
                        <button type="button" @click="showPayment = true" class="btn btn-sm p-3 btn-primary mb-3">
                            <span class="ps-3">Procedi al pagamento</span>
                            <font-awesome-icon icon="fa-solid fa-arrow-right" class="icon" />
                        </button>
                    </div>
                </div>
                <div v-else class="row">
                    <Braintree></Braintree>
                </div>

            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #0C4160;

    padding: 30px 10px;
}

.card {
    max-width: 70%;
    margin: auto;
    color: black;
    border-radius: 20 px;
}

p {
    margin: 0px;
}

.container .h8 {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
}

.btn.btn-primary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
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


.form-control {
    color: white;
    background-color: #223C60;
    border: 2px solid transparent;
    height: 60px;
    padding-left: 20px;
    vertical-align: middle;
}

.form-control:focus {
    color: white;
    background-color: #0C4160;
    border: 2px solid #2d4dda;
    box-shadow: none;
}

.text {
    font-size: 14px;
    font-weight: 600;
}

::placeholder {
    font-size: 14px;
    font-weight: 600;
}
</style>