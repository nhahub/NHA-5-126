import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './Pages/home/Home'
import ProductsPage from './Pages/ProductsPage'
import ProductDetailsPage from './Pages/ProductDetailsPage'
import Deals from './Pages/deals/Deals'
import Categories from './Pages/categories/Categories'
import CartPage from './Pages/CartPage'
import Accessories from "./pages/Accessories/Accessories";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/accessories" element={<Accessories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
