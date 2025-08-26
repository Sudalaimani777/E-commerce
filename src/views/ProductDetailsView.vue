<template>
  <div>
    <v-btn
      class="mb-4"
      variant="text"
      prepend-icon="mdi-arrow-left"
      to="/"
    >
      Back to Products
    </v-btn>

    <v-alert
      v-if="error"
      type="error"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <div v-if="loading">
      <v-skeleton-loader type="image, article" class="mb-4"></v-skeleton-loader>
    </div>

    <div v-else-if="product">
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="product.image"
            :alt="product.title"
            height="400"
            contain
            class="bg-grey-lighten-3 rounded"
          ></v-img>
        </v-col>

        <v-col cols="12" md="6">
          <h1 class="text-h4 mb-2">{{ product.title }}</h1>
          
          <div class="d-flex align-center mb-4">
            <v-rating
              v-if="product.rating"
              :model-value="product.rating.rate"
              color="amber"
              half-increments
              readonly
            ></v-rating>
            <span class="text-grey-darken-1 ms-2" v-if="product.rating">
              ({{ product.rating.count }} reviews)
            </span>
          </div>

          <div class="text-h5 font-weight-bold mb-4">${{ product.price.toFixed(2) }}</div>
          
          <v-chip class="mb-4" color="primary" variant="outlined">{{ product.category }}</v-chip>
          
          <p class="text-body-1 mb-6">{{ product.description }}</p>
          
          <div class="d-flex align-center mb-6">
            <v-text-field
              v-model="quantity"
              label="Quantity"
              type="number"
              min="1"
              max="99"
              hide-details
              density="compact"
              style="max-width: 100px"
            ></v-text-field>
            
            <v-btn
              color="primary"
              size="large"
              class="ml-4"
              prepend-icon="mdi-cart-plus"
              @click="addToCart"
            >
              Add to Cart
            </v-btn>
            
            <v-btn
              :color="isFavorite ? 'red' : undefined"
              variant="text"
              size="large"
              class="ml-2"
              icon
              @click="toggleFavorite"
            >
              <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <p>Product not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
import { api } from '@/services/api';
import type { Product } from '@/types';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const quantity = ref(1);

const productId = computed(() => Number(route.params.id));
const isFavorite = computed(() => 
  product.value ? favoritesStore.isInFavorites(product.value.id) : false
);

onMounted(async () => {
  try {
    loading.value = true;
    product.value = await api.getProduct(productId.value);
  } catch (err) {
    error.value = 'Failed to load product details. Please try again later.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value, Number(quantity.value));
  }
}

function toggleFavorite() {
  if (product.value) {
    favoritesStore.toggleFavorite(product.value);
  }
}
</script>