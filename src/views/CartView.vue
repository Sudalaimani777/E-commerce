<template>
  <div>
    <ConfettiExplosion v-if="showConfetti" :force="0.8" />
    <h1 class="text-h4 mb-6">Shopping Cart</h1>

    <v-alert v-if="cart.items.length === 0" color="info" icon="mdi-cart-outline">
      Your cart is empty. <router-link to="/">Continue shopping</router-link>
    </v-alert>

    <template v-else>
      <v-list lines="three">
        <v-list-item v-for="item in cart.items" :key="item.product.id" :title="item.product.title"
          :subtitle="`$${item.product.price.toFixed(2)}`">
          <template v-slot:prepend>
            <v-avatar size="80" rounded class="mr-4">
              <v-img :src="item.product.image" cover></v-img>
            </v-avatar>
          </template>

          <template v-slot:append>
            <div class="d-flex align-center">
              <v-btn icon="mdi-minus" size="small" variant="text" @click="decreaseQuantity(item.product.id)"></v-btn>

              <span class="mx-2">{{ item.quantity }}</span>

              <v-btn icon="mdi-plus" size="small" variant="text" @click="increaseQuantity(item.product.id)"></v-btn>

              <v-btn icon="mdi-delete" color="error" variant="text" class="ml-4"
                @click="removeItem(item.product.id)"></v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-space-between align-center">
        <div class="text-h5">Total: ${{ cart.totalPrice.toFixed(2) }}</div>
        <div>
          <v-btn color="error" variant="text" prepend-icon="mdi-delete" @click="clearCart">
            Clear Cart
          </v-btn>
          <v-btn color="primary" class="ml-4" prepend-icon="mdi-cash-register" @click="openCheckoutModal">
            Checkout
          </v-btn>
          <!-- Enhanced Checkout Modal -->
          <v-dialog v-model="checkoutModal" max-width="500">
            <v-card class="pa-4 rounded-lg elevation-10">
              <v-card-title class="d-flex align-center justify-center">
                <v-icon color="primary" size="32" class="mr-2">mdi-cart-check</v-icon>
                <span class="text-h5 font-weight-bold">Checkout</span>
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
              <v-card-text>
                <v-form ref="checkoutFormRef" v-model="valid" @submit.prevent="submitCheckout"
                  class="d-flex flex-column gap-4">
                  <v-text-field v-model="checkoutForm.name" label="Full Name"
                    :rules="[(v: string) => !!v || 'Name is required', (v: string) => v.length >= 3 || 'Name must be at least 3 characters']"
                    required prepend-icon="mdi-account" outlined></v-text-field>
                  <v-text-field v-model="checkoutForm.address" label="Address"
                    :rules="[(v: string) => !!v || 'Address is required', (v: string) => v.length >= 5 || 'Address must be at least 5 characters']"
                    required prepend-icon="mdi-home" outlined></v-text-field>
                  <v-text-field v-model="checkoutForm.email" label="Email"
                    :rules="[(v: string) => !!v || 'Email is required', (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid']"
                    required type="email" prepend-icon="mdi-email" outlined></v-text-field>
                  <v-text-field v-model="checkoutForm.card" label="Card Number"
                    :rules="[(v: string) => !!v || 'Card number is required', (v: string) => /^\d{16}$/.test(v) || 'Card number must be 16 digits']"
                    required type="text" prepend-icon="mdi-credit-card" outlined></v-text-field>
                  <div class="d-flex justify-end mt-2">
                    <v-btn text color="grey" class="mr-2" @click="closeCheckoutModal">Cancel</v-btn>
                    <v-btn type="submit" color="primary" class="font-weight-bold" :disabled="!valid">Submit</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import ConfettiExplosion from 'vue-confetti-explosion';
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

const checkoutModal = ref(false);
const checkoutForm = ref({
  name: "",
  address: "",
  email: "",
  card: "",
});
const checkoutFormRef = ref();
const valid = ref(false);
const showConfetti = ref(false);

function openCheckoutModal() {
  checkoutForm.value = {
    name: "",
    address: "",
    email: "",
    card: "",
  };
  checkoutModal.value = true;
}

function decreaseQuantity(productId: number) {
  const item = cart.items.find((item) => item.product.id === productId);
  if (item && item.quantity > 1) {
    cart.updateQuantity(productId, item.quantity - 1);
  } else {
    removeItem(productId);
  }
}

function increaseQuantity(productId: number) {
  const item = cart.items.find((item) => item.product.id === productId);
  if (item) {
    cart.updateQuantity(productId, item.quantity + 1);
  }
}

function removeItem(productId: number) {
  cart.removeFromCart(productId);
}

function clearCart() {
  cart.clearCart();
}

function closeCheckoutModal() {
  checkoutModal.value = false;
}

async function submitCheckout() {
  if (checkoutFormRef.value && checkoutFormRef.value.validate()) {
    cart.clearCart();
    closeCheckoutModal();
    showConfetti.value = true;
    setTimeout(() => {
      showConfetti.value = false;
    }, 2000); // Hide after 2 seconds
  }
}
</script>
