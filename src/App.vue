<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none">E-Shop</router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/favorites" icon>
        <v-icon>mdi-heart</v-icon>
        <v-badge
          v-if="favorites.items.length > 0"
          :content="favorites.items.length"
          color="error"
        ></v-badge>
      </v-btn>
      <v-btn to="/cart" icon class="ml-4">
        <v-icon>mdi-cart</v-icon>
        <v-badge
          v-if="cart.totalItems > 0"
          :content="cart.totalItems"
          color="error"
        ></v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app color="primary" class="text-center d-flex justify-center">
      <div class="text-white">
        &copy; {{ new Date().getFullYear() }} — E-Shop
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useCartStore } from './stores/cart';
import { useFavoritesStore } from './stores/favorites';

const cart = useCartStore();
const favorites = useFavoritesStore();
</script>
<style scoped></style>
