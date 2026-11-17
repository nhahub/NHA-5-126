import { useSearchParams } from "react-router-dom";

export default function SidebarFilters({ categories, brands }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read active filters from the URL
  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");
  const maxPrice = searchParams.get("maxPrice") || "1500";

  // A helper function to handle clicking checkboxes
  const updateParams = (key, value) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      // If you click the same one, uncheck it (delete from URL). Otherwise, set it.
      if (value === "" || value === searchParams.get(key)) {
        p.delete(key); 
      } else {
        p.set(key, value); 
      }
      return p;
    });
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 font-body text-sm">
      
      {/* CATEGORIES */}
      <div className="mb-8">
        <h3 className="font-heading font-bold text-ink text-xs uppercase tracking-[0.15em] mb-4">Category</h3>
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <li 
                key={cat} 
                onClick={() => updateParams("category", cat)}
                className={`flex items-center gap-3 cursor-pointer transition-colors group ${isActive ? 'text-signal font-semibold' : 'text-muted hover:text-ink'}`}
              >
                {/* Custom Checkbox Design */}
                <div className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors ${isActive ? 'border-signal bg-signal' : 'border-warmgray group-hover:border-muted'}`}>
                  {isActive && <svg className="w-2.5 h-2.5 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="capitalize">{cat.replace("-", " ")}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* BRANDS */}
      <div className="mb-8 pt-6 border-t border-warmgray">
        <h3 className="font-heading font-bold text-ink text-xs uppercase tracking-[0.15em] mb-4">Brand</h3>
        <ul className="space-y-3">
          {brands.map(brand => {
            const isActive = activeBrand === brand;
            return (
              <li 
                key={brand} 
                onClick={() => updateParams("brand", brand)}
                className={`flex items-center gap-3 cursor-pointer transition-colors group ${isActive ? 'text-signal font-semibold' : 'text-muted hover:text-ink'}`}
              >
                <div className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors ${isActive ? 'border-signal bg-signal' : 'border-warmgray group-hover:border-muted'}`}>
                  {isActive && <svg className="w-2.5 h-2.5 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                {brand}
              </li>
            );
          })}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="pt-6 border-t border-warmgray">
        <h3 className="font-heading font-bold text-ink text-xs uppercase tracking-[0.15em] mb-4">Max Price</h3>
        <input 
          type="range" 
          min="0" 
          max="1500" 
          value={maxPrice}
          onChange={(e) => updateParams("maxPrice", e.target.value)}
          className="w-full accent-signal cursor-pointer" 
        />
        <div className="flex justify-between text-muted text-[10px] font-bold mt-2 uppercase tracking-widest">
          <span>$0</span>
          <span className="text-ink">${maxPrice}</span>
        </div>
      </div>

      {/* CLEAR ALL BUTTON */}
      <button 
        onClick={() => setSearchParams({})}
        className="mt-8 text-[11px] text-signal font-bold uppercase tracking-widest hover:text-ink transition-colors border-b border-signal pb-1"
      >
        Clear all filters
      </button>

    </aside>
  );
}