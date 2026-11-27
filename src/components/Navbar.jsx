import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/icons/Logo.png'
import search from '../assets/icons/search.png'
import cart from '../assets/icons/cart.png'
import { selectCartItemCount } from '../store/cartSlice'

const navLinkClass = ({ isActive }) =>
  `relative inline-block font-inter text-[#191919] no-underline transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-[#F06432] after:transition-all after:duration-300 ${
    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
  }`

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartItemCount = useSelector(selectCartItemCount)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="bg-[#191919] text-white min-h-8 px-5 sm:px-10 lg:px-[5%] flex items-center justify-center sm:grid sm:grid-cols-3 text-[9px] sm:text-[10px] tracking-[0.12em]">
        <div className="hidden sm:block" />
        <p className="text-center text-[9px] sm:text-[10px] font-medium whitespace-nowrap font-inter">
          GOOD TECHNOLOGY. BETTER EVERYDAY.
        </p>
        <p className="hidden sm:block text-right text-[#AAAAAA] font-inter whitespace-nowrap">
          FREE DELIVERY OVER $100 · 30-DAY RETURNS
        </p>
      </div>

      <nav className="sticky top-0 z-50 bg-[#F6F3EC]/95 backdrop-blur-sm px-5 sm:px-10 lg:px-[5%] border-b border-[#D4CDC2]">
        <div className="max-w-[1280px] mx-auto w-full">
          <div className="min-h-21 flex items-center justify-between gap-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 shrink-0 justify-self-start no-underline"
            >
              <img
                src={logo}
                alt="TechVault logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#191919]">
                TechVault
              </span>
            </Link>

            <ul className="hidden lg:flex items-center justify-center gap-8 text-sm absolute left-1/2 -translate-x-1/2">
              <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/products" className={navLinkClass}>Products</NavLink></li>
              <li><NavLink to="/categories" className={navLinkClass}>Categories</NavLink></li>
              <li><NavLink to="/deals" className={navLinkClass}>Deals</NavLink></li>
            </ul>

            <div className="hidden lg:flex items-center gap-5 justify-self-end">
              <div className="flex items-center gap-3 w-55.5 border-b border-[#191919] pb-2 focus-within:border-[#191919] transition-colors duration-300">
                <img src={search} alt="" className="w-4 h-4 shrink-0 object-contain" />
                <input
                  type="text"
                  aria-label="Search the edit"
                  placeholder="Search the edit"
                  className="font-inter flex-1 min-w-0 bg-transparent text-[15px] text-[#191919] placeholder:text-[#8A8780] outline-none"
                />
              </div>
              <Link
                to="/cart"
                aria-label={`Shopping cart, ${cartItemCount} items`}
                className="relative flex items-center justify-center no-underline hover:opacity-60 transition-opacity duration-300"
              >
                <img src={cart} alt="Shopping cart" className="w-6 h-6 object-contain" />
                <span className="absolute -top-3 -right-3 bg-[#F06432] text-white text-[11px] font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                  {cartItemCount}
                </span>
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-4">
              <Link
                to="/cart"
                aria-label={`Shopping cart, ${cartItemCount} items`}
                className="relative flex items-center justify-center no-underline hover:opacity-60 transition-opacity duration-300"
              >
                <img src={cart} alt="Shopping cart" className="w-6 h-6 object-contain" />
                <span className="absolute -top-3 -right-3 bg-[#F06432] text-white text-[11px] font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                  {cartItemCount}
                </span>
              </Link>
              <button
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((isOpen) => !isOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[#D4CDC2] text-[#191919] hover:border-[#191919] transition-colors"
              >
                <span className={`block w-4 h-px bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-1 rotate-45' : ''}`} />
                <span className={`block w-4 h-px bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-4 h-px bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-1 -rotate-45' : ''}`} />
              </button>
            </div>
          </div>

          <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden border-t border-[#D4CDC2] pb-5`}>
            <ul className="flex flex-col gap-5 pt-5 text-sm">
              <li><NavLink to="/" end onClick={closeMenu} className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/products" onClick={closeMenu} className={navLinkClass}>Products</NavLink></li>
              <li><NavLink to="/categories" onClick={closeMenu} className={navLinkClass}>Categories</NavLink></li>
              <li><NavLink to="/deals" onClick={closeMenu} className={navLinkClass}>Deals</NavLink></li>
            </ul>
            <div className="flex items-center gap-3 w-full border-b border-[#191919] pb-2 mt-6">
              <img src={search} alt="" className="w-4 h-4 shrink-0 object-contain" />
              <input
                type="text"
                aria-label="Search the edit"
                placeholder="Search the edit"
                className="font-inter flex-1 min-w-0 bg-transparent text-sm text-[#191919] placeholder:text-[#8A8780] outline-none"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
