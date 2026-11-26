import { useSearchParams } from "react-router-dom";

export default function SearchSortBar({ resultCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("q") || "";
  const sortValue = searchParams.get("sortBy") 
    ? `${searchParams.get("sortBy")}-${searchParams.get("order")}` 
    : "";

  const handleSearch = (e) => {
    const value = e.target.value;
    
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (value) {
        p.set("q", value); 
      } else {
        p.delete("q"); 
      }
      return p;
    });
  };

  const handleSort = (e) => {
    const value = e.target.value; 
    
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (!value) {
        p.delete("sortBy"); 
        p.delete("order");
      } else {
        const [sortBy, order] = value.split("-");
        p.set("sortBy", sortBy);
        p.set("order", order);
      }
      return p;
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-warmgray pb-4 mb-8">
      
      <div className="flex items-center gap-3 w-full md:w-1/2 group">
        <svg className="w-5 h-5 text-muted group-focus-within:text-signal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          type="text" 
          placeholder="Search by product, brand, or category" 
          value={query}
          onChange={handleSearch}
          className="w-full bg-transparent border-b border-transparent focus:border-signal outline-none text-ink placeholder:text-muted font-body text-sm py-1 transition-colors"
        />
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        
        <span className="text-muted text-[10px] font-bold uppercase tracking-widest hidden md:block">
          {resultCount} Products
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-muted text-[10px] font-bold uppercase tracking-widest">Sort by</span>
          <select 
            value={sortValue} 
            onChange={handleSort}
            className="bg-transparent border-none outline-none text-ink font-heading font-bold text-sm cursor-pointer focus:ring-0"
          >
            <option value="">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

    </div>
  );
}