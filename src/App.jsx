import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* A simple temporary Navbar */}
      <nav className="bg-surface border-b border-warmgray p-4 flex gap-6 font-heading font-bold shadow-sm">
        <Link to="/" className="text-ink hover:text-signal text-xl">TechValut</Link>
        <Link to="/products" className="text-ink hover:text-signal">Products Page</Link>
      </nav>

      <Routes>
        {/* A fake Home page for now */}
        <Route path="/" element={<div className="p-10 font-heading text-3xl bg-ivory min-h-screen">Home Page</div>} />
        
        {/* The real Products Page */}
        <Route path="/products" element={<ProductsPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}