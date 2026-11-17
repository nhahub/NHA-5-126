import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, loading }) {
  // 1. Loading State
  // If the API is still fetching, show this.
  if (loading) {
    return (
      <div className="text-center py-20 font-heading text-xl text-muted">
        Loading products...
      </div>
    );
  }

  // 2. Empty State
  // If the products array is empty (e.g., user searched for "asdfgh"), show this.
  if (!products.length) {
    return (
      <div className="text-center py-20 border border-warmgray border-dashed rounded-sm bg-surface">
        <h3 className="font-heading text-2xl font-bold text-ink mb-2">No products found</h3>
        <p className="font-body text-muted">Try adjusting your search or filters.</p>
      </div>
    );
  }

  // 3. Success State (The Grid)
  // 'grid' activates CSS Grid. 'gap-6' puts space between cards.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      
    </div>
  );
}