import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsGrid from "../Components/products/ProductsGrid";
import SearchSortBar from "../Components/products/SearchSortBar";
import SidebarFilters from "../Components/products/SidebarFilters";
import { categories, brands } from "../data/products";
import { productService } from "../Helpers/productService";

export default function ProductsPage() {
  // Read the URL (e.g., ?category=laptops&q=apple)
  const [searchParams] = useSearchParams();
  
  // API State
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const controller = new AbortController();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const products = await productService.getAllProducts(controller.signal);
      setAllProducts(products);
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


  // THE FILTER ENGINE
  const filteredProducts = useMemo(() => {
    // Read current URL parameters
    const query = (searchParams.get("q") || "").toLowerCase();
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");

    // 1. Filter the array
    let result = allProducts.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query) && !p.brand?.toLowerCase().includes(query)) return false;
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    // 2. Sort the filtered array
    if (sortBy === "price") {
      result.sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchParams, allProducts]); // Re-run when URL or API data changes

  // Handle Loading & Errors
  if (loading) return <div className="min-h-screen flex items-center justify-center font-heading text-2xl text-signal">Loading TechValut Catalog...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-heading text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-signal label-editorial mb-2">The Complete Edit</p>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-ink tracking-tighter mb-4">
          ALL PRODUCTS
        </h1>
        <p className="font-body text-muted text-lg max-w-xl">
          Useful, beautiful technology—selected for how well it fits into real life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Pass the count to the Search Bar */}
        <SearchSortBar resultCount={filteredProducts.length} />

        <div className="flex flex-col md:flex-row gap-10 mt-8">
          {/* Sidebar */}
          <SidebarFilters categories={categories} brands={brands} />
          
          {/* Main Grid */}
          <div className="flex-1">
            <ProductsGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>

    </div>
  );
}