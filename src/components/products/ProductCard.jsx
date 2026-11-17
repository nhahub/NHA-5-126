import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product, showDiscount = false }) {
  const dispatch = useDispatch();

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group flex flex-col bg-surface border border-warmgray rounded-sm overflow-hidden"
    >
      <div className="relative aspect-square bg-[#0d0d0d] overflow-hidden">

        {product.tag && (
          <span className="absolute bottom-4 left-4 z-10 bg-ink text-surface text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
            {product.tag}
          </span>
        )}

        {showDiscount && product.discountPercentage > 0 && (
          <span className="absolute bottom-4 left-4 z-10 bg-ink text-surface text-[8px] font-bold uppercase tracking-[0.15em] px-3 py-2">
            SAVE {Math.round(product.discountPercentage)}%
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
            
            {(product.oldPrice || (showDiscount && product.discountPercentage > 0)) && (
              <span className="text-muted text-sm line-through decoration-muted">
                ${product.oldPrice ?? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              dispatch(addToCart(product));
            }}
            aria-label={`Add ${product.title} to cart`}
            className="bg-ink text-surface w-10 h-10 flex items-center justify-center hover:bg-signal transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}