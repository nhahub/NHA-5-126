import axios from "axios";

const API_URL = "https://dummyjson.com";


export const productService={
getAllProducts: async (signal) => {
  try {
    const response = await axios.get(`${API_URL}/products?limit=100`, { signal });
    return response.data.products;

} catch (error) {
    if (error.name === 'CanceledError') throw error;
    throw new Error(error.message || "Failed to fetch products");
  }
},

  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }


}