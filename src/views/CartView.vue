<template>
  <div>
    <ConfettiExplosion v-if="showConfetti" :force="0.8" />
    <h1 class="text-h4 mb-6">Shopping Cart</h1>

    <!-- Order Success Animation -->
    <div v-if="orderPlaced && cart.items.length === 0" class="order-success-container">
      <v-card class="order-success-card mx-auto" max-width="500" elevation="8">
        <v-card-text class="text-center pa-8">
          <div class="success-icon-container mb-6">
            <v-icon class="success-icon" color="success" size="80">mdi-check-circle</v-icon>
            <div class="success-ripple"></div>
          </div>

          <h2 class="text-h4 font-weight-bold success-title mb-4">Order Placed Successfully!</h2>

          <p class="text-h6 text-medium-emphasis mb-6 success-subtitle">
            🎉 Thank you for your purchase! Your order has been confirmed and is being processed.
          </p>

          <div class="order-details mb-6">
            <v-chip class="ma-1" color="success" variant="outlined">
              <v-icon start>mdi-email</v-icon>
              Confirmation sent
            </v-chip>
            <v-chip class="ma-1" color="primary" variant="outlined">
              <v-icon start>mdi-truck-delivery</v-icon>
              Processing order
            </v-chip>
          </div>

          <div class="action-buttons">
            <v-btn color="primary" size="large" variant="elevated" prepend-icon="mdi-home" @click="goHome"
              class="mr-4 continue-btn">
              Continue Shopping
            </v-btn>

            <v-btn color="success" size="large" variant="outlined" prepend-icon="mdi-receipt" @click="viewOrder"
              class="order-btn">
              View Order
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Empty Cart Message (when no order placed) -->
    <v-alert v-else-if="cart.items.length === 0 && !orderPlaced" color="info" icon="mdi-cart-outline">
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
const orderPlaced = ref(false);

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
    closeCheckoutModal();
    showConfetti.value = true;
    orderPlaced.value = true;
    cart.clearCart();

    // Hide confetti after animation
    setTimeout(() => {
      showConfetti.value = false;
    }, 4000);
  }
}

function goHome() {
  orderPlaced.value = false;
  window.location.href = '/';
}

function viewOrder() {
  orderPlaced.value = false;
  // You can implement order tracking functionality here
  alert('Order tracking feature coming soon!');
}
</script>

<style scoped>
.order-success-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  animation: fadeInUp 0.8s ease-out;
}

.order-success-card {
  border-radius: 16px !important;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: visible;
}

.success-icon-container {
  position: relative;
  display: inline-block;
}

.success-icon {
  animation: bounceIn 1s ease-out, pulse 2s infinite 1s;
  position: relative;
  z-index: 2;
}

.success-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 3px solid #4caf50;
  border-radius: 50%;
  animation: ripple 2s infinite;
  opacity: 0;
}

.success-title {
  color: #2e7d32;
  animation: slideInUp 0.8s ease-out 0.3s both;
}

.success-subtitle {
  animation: slideInUp 0.8s ease-out 0.5s both;
}

.order-details {
  animation: slideInUp 0.8s ease-out 0.7s both;
}

.action-buttons {
  animation: slideInUp 0.8s ease-out 0.9s both;
}

.continue-btn,
.order-btn {
  transition: all 0.3s ease;
  border-radius: 25px !important;
}

.order-btn {
  margin-top : 20px;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 600px) {
  .order-success-card {
    margin: 0 16px;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .continue-btn {
    margin-right: 0 !important;
  }
}
</style>
