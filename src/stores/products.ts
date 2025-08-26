import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types';
import { api } from '@/services/api';

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      products.value = await api.getProducts();
    } catch (err) {
      error.value = 'Failed to fetch products. Please try again later.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function getProductById(id: number): Promise<Product | undefined> {
    if (products.value.length === 0) {
      await fetchProducts();
    }
    return products.value.find(p => p.id === id);
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById
  };
});