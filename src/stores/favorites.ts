import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types';

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref<Product[]>([]);

  function addToFavorites(product: Product) {
    if (!isInFavorites(product.id)) {
      items.value.push(product);
    }
  }

  function removeFromFavorites(productId: number) {
    const index = items.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }

  function isInFavorites(productId: number): boolean {
    return items.value.some(item => item.id === productId);
  }

  function toggleFavorite(product: Product) {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }

  return {
    items,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    toggleFavorite
  };
});