import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group flex flex-col bg-surface border border-warmgray rounded-sm overflow-hidden"
    >
      <div className="relative aspect-square bg-[#0d0d0d] overflow-hidden">
        
        <span className="absolute top-4 left-4 z-10 text-xs font-body font-bold text-signal tracking-widest">
          {String(product.id).padStart(2, '0')}
        </span>

        {product.tag && (
          <span className="absolute bottom-4 left-4 z-10 bg-ink text-surface text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
            {product.tag}
          </span>
        )}

        <div className="absolute top-4 right-4 z-10 w-6 h-6 border border-white/60"></div>

        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </div>

      <div className="p-6 font-body flex flex-col flex-grow">
        
        <div className="flex justify-between items-start mb-3">
          <p className="text-muted text-[11px] font-bold uppercase tracking-widest">
            {product.brand || "TechValut"}
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-ink">
            <span className="text-signal text-sm">★</span> {product.rating}
          </div>
        </div>
        
        <h3 className="font-heading font-bold text-ink text-xl leading-snug mb-6">
          {product.title}
        </h3>
        
        <div className="flex justify-between items-center mt-auto pt-4">
          
          <div className="flex items-baseline gap-2">
            {/* FIX 2: Removed .toFixed(2) so it doesn't crash if the price is a whole number */}
            <span className="font-heading font-bold text-ink text-2xl">${product.price}</span>
            
            {product.oldPrice && (
              <span className="text-muted text-sm line-through decoration-muted">
                ${product.oldPrice}
              </span>
            )}
          </div>
          
          <button className="bg-ink text-surface w-10 h-10 flex items-center justify-center hover:bg-signal transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}