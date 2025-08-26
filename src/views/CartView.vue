<template>
  <div>
    <h1 class="text-h4 mb-6">Shopping Cart</h1>

    <v-alert
      v-if="cart.items.length === 0"
      color="info"
      icon="mdi-cart-outline"
    >
      Your cart is empty. <router-link to="/">Continue shopping</router-link>
    </v-alert>

    <template v-else>
      <v-list lines="three">
        <v-list-item
          v-for="item in cart.items"
          :key="item.product.id"
          :title="item.product.title"
          :subtitle="`$${item.product.price.toFixed(2)}`"
        >
          <template v-slot:prepend>
            <v-avatar size="80" rounded class="mr-4">
              <v-img :src="item.product.image" cover></v-img>
            </v-avatar>
          </template>

          <template v-slot:append>
            <div class="d-flex align-center">
              <v-btn
                icon="mdi-minus"
                size="small"
                variant="text"
                @click="decreaseQuantity(item.product.id)"
              ></v-btn>
              
              <span class="mx-2">{{ item.quantity }}</span>
              
              <v-btn
                icon="mdi-plus"
                size="small"
                variant="text"
                @click="increaseQuantity(item.product.id)"
              ></v-btn>
              
              <v-btn
                icon="mdi-delete"
                color="error"
                variant="text"
                class="ml-4"
                @click="removeItem(item.product.id)"
              ></v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between align-center">
        <div class="text-h5">
          Total: ${{ cart.totalPrice.toFixed(2) }}
        </div>
        
        <div>
          <v-btn
            color="error"
            variant="text"
            prepend-icon="mdi-delete"
            @click="clearCart"
          >
            Clear Cart
          </v-btn>
          
          <v-btn
            color="primary"
            class="ml-4"
            prepend-icon="mdi-cash-register"
            @click="checkout"
          >
            Checkout
          </v-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();

function increaseQuantity(productId: number) {
  const item = cart.items.find(item => item.product.id === productId);
  if (item) {
    cart.updateQuantity(productId, item.quantity + 1);
  }
}

function decreaseQuantity(productId: number) {
  const item = cart.items.find(item => item.product.id === productId);
  if (item && item.quantity > 1) {
    cart.updateQuantity(productId, item.quantity - 1);
  } else {
    removeItem(productId);
  }
}

function removeItem(productId: number) {
  cart.removeFromCart(productId);
}

function clearCart() {
  cart.clearCart();
}

function checkout() {
  // In a real application, this would redirect to a checkout page
  // For this demo, we'll just clear the cart and show an alert
  alert('Thank you for your purchase!');
  cart.clearCart();
}
</script>