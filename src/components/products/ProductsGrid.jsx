import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, loading }) {
  
  if (loading) {
    return (
      <div className="text-center py-20 font-heading text-xl text-muted">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 border border-warmgray border-dashed rounded-sm bg-surface">
        <h3 className="font-heading text-2xl font-bold text-ink mb-2">No products found</h3>
        <p className="font-body text-muted">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      
    </div>
  );
}