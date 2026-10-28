
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/layout/Layout' 
import Home from './pages/home/Home'
import ProductsPage from './Pages/ProductsPage'
import Deals from './Pages/deals/Deals'
import Categories from './Pages/categories/Categories' 



const Cart = () => <div className="p-10 font-heading text-3xl">Cart Page (Coming Soon)</div>
const Details = () => <div className="p-10 font-heading text-3xl">Product Details (Coming Soon)</div>


export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />

</Route>

      </Routes>
    </BrowserRouter>
  )
}
