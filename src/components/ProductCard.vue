<template>
  <v-card height="100%" class="d-flex flex-column">
    <div class="text-center pa-4 flex-grow-0">
      <v-img
        :src="product.image"
        :alt="product.title"
        height="200"
        contain
        class="bg-grey-lighten-3"
      ></v-img>
    </div>

    <v-card-title class="text-truncate">{{ product.title }}</v-card-title>

    <v-card-text class="flex-grow-1">
      <div class="d-flex align-center mb-2">
        <v-rating
          v-if="product.rating"
          :model-value="product.rating.rate"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>
        <span class="text-grey-darken-1 text-caption ms-2" v-if="product.rating">
          ({{ product.rating.count }})
        </span>
      </div>
      <div class="text-h6 font-weight-bold mb-2">${{ product.price.toFixed(2) }}</div>
      <div class="text-truncate-2 text-body-2">{{ product.description }}</div>
    </v-card-text>

    <v-card-actions class="flex-grow-0">
      <v-btn
        variant="text"
        color="primary"
        :to="`/product/${product.id}`"
        prepend-icon="mdi-information"
      >
        Details
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :color="isFavorite ? 'red' : undefined"
        @click="toggleFavorite"
      >
        <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
      <v-btn
        icon
        color="primary"
        @click="addToCart"
      >
        <v-icon>mdi-cart-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';

const props = defineProps<{
  product: Product;
}>();

const cart = useCartStore();
const favorites = useFavoritesStore();

const isFavorite = computed(() => favorites.isInFavorites(props.product.id));

function addToCart() {
  cart.addToCart(props.product, 1);
}

function toggleFavorite() {
  favorites.toggleFavorite(props.product);
}
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>