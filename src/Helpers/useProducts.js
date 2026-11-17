import { useState, useEffect } from "react";
import { productService } from "./productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getAllProducts(controller.signal);
        setProducts(products);
      } catch (err) {
        if (err.name === 'CanceledError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
