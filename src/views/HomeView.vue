<template>
  <div>
    <h1 class="text-h4 mb-6">Products</h1>

    <v-alert
      v-if="productStore.error"
      type="error"
      class="mb-4"
    >
      {{ productStore.error }}
    </v-alert>

    <div v-if="productStore.loading">
      <v-skeleton-loader
        v-for="i in 6"
        :key="i"
        type="card"
        class="mb-4"
      ></v-skeleton-loader>
    </div>

    <v-row v-else>
      <v-col
        v-for="product in productStore.products"
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
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>