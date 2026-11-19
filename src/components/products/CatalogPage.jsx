import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import SearchSortBar from "./SearchSortBar";
import SidebarFilters from "./SidebarFilters";
import { categories, brands } from "../../data/products";

export default function CatalogPage({
  eyebrow,
  title,
  description,
  products,
  loading,
  error,
  showDiscount = false,
}) {
  const [searchParams] = useSearchParams();

  const filteredProducts = useMemo(() => {
    // 1. تحسين قراءة الكويري (شيل المسافات الزيادة وحولها لحروف صغيرة)
    const query = (searchParams.get("q") || "").trim().toLowerCase();
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");

    let result = products.filter((p) => {
      // 2. البحث بيشتغل دلوقتي على: الاسم (title) + البراند (brand) + الكاتيجوري (category)
      if (query) {
        const productName = p.title?.toLowerCase() || "";
        const productBrand = p.brand?.toLowerCase() || "";
        const productCategory = p.category?.toLowerCase() || "";
        
        // بنجمع كل حاجة في نص واحد وندور فيها
        const fullText = `${productName} ${productBrand} ${productCategory}`;
        
        // لو فيه كذا كلمة، لازم كلهم يكونوا موجودين
        const searchTerms = query.split(/\s+/);
        if (!searchTerms.every(term => fullText.includes(term))) return false;
      }

      // فلاتر جانبية
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      
      return true;
    });

    // الترتيب
    if (sortBy === "price") {
      result.sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchParams, products]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-heading text-2xl text-signal">Loading TechValut Catalog...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-heading text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">

      {/* Page Header */}
      <div className="mb-12">
        <p className="text-signal label-editorial mb-2">{eyebrow}</p>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-ink tracking-tighter mb-4">
          {title}
        </h1>
        <p className="font-body text-muted text-lg max-w-xl">
          {description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <SearchSortBar resultCount={filteredProducts.length} />

        <div className="flex flex-col md:flex-row gap-10 mt-8">
          {/* Sidebar */}
          <SidebarFilters categories={categories} brands={brands} />

          {/* Main Grid */}
          <div className="flex-1">
            <ProductsGrid products={filteredProducts} loading={loading} showDiscount={showDiscount} />
          </div>
        </div>
      </div>

    </div>
  );
}