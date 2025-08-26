import axios from 'axios';
import type { Product } from '@/types';

const API_URL = 'https://fakestoreapi.com';

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }
};