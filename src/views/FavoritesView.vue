<template>
  <div>
    <h1 class="text-h4 mb-6">Favorites</h1>

    <v-alert
      v-if="favorites.items.length === 0"
      color="info"
      icon="mdi-heart-outline"
    >
      You don't have any favorite products yet. <router-link to="/">Browse products</router-link>
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="product in favorites.items"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import ProductCard from '@/components/ProductCard.vue';

const favorites = useFavoritesStore();
</script>