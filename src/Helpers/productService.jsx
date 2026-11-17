import axios from "axios";
import { filterAllowedProducts } from "../data/products";

const API_URL = "https://dummyjson.com";

const getErrorMessage = (error, fallback) =>
  error instanceof Error && error.message ? error.message : fallback;

export const productService = {
  getAllProducts: async (signal) => {
    try {
      const response = await axios.get(`${API_URL}/products?limit=0`, { signal });
      return filterAllowedProducts(response.data.products || []);
    } catch (error) {
      if (axios.isCancel(error)) throw error;
      throw new Error(getErrorMessage(error, "Failed to fetch products"));
    }
  },

  getProductById: async (id, signal) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`, { signal });
      return filterAllowedProducts([response.data])[0] || null;
    } catch (error) {
      if (axios.isCancel(error)) throw error;
      throw new Error(getErrorMessage(error, "Failed to fetch product"));
    }
  },
};
