import React from 'react'

import logo from '../assets/icons/logo.png'
import search from '../assets/icons/search.png'
import cart from '../assets/icons/cart.png'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {

  return (
    <>
      <div className="bg-[#191919] text-white min-h-8 px-9.5 sm:px-20 grid grid-cols-3 items-center text-[9px] sm:text-[10px] tracking-[0.12em]">

        <div />

        <p className="text-center text-[10px] font-medium whitespace-nowrap font-inter">
          GOOD TECHNOLOGY. BETTER EVERYDAY.
        </p>

        <p className="text-right text-[#AAAAAA] font-inter  whitespace-nowrap">
          FREE DELIVERY OVER $100 · 30-DAY RETURNS
        </p>

      </div>

      <nav className="sticky top-0 z-50 bg-[#F6F3EC]/95 backdrop-blur-sm px-5 sm:px-10 lg:px-[5%] max-w-[1187.2] min-h-21 grid grid-cols-1 lg:grid-cols-3 items-center border-b border-[#D4CDC2]">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 justify-self-start no-underline"
        >
          <img
            src={logo}
            alt="TechVault logo"
            className="w-9 h-9 object-contain"
          />

          <span className=" font-heading text-xl sm:text-2xl font-bold text-[#191919]">
            TechVault
          </span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-8 text-[13px] sm:text-sm py-3 lg:py-0">

  <li>
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        `relative inline-block font-inter text-[#191919] no-underline transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-[#F06432] after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`
      }
    >
      Home
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/products"
      className={({ isActive }) =>
        `relative inline-block font-inter text-[#191919] no-underline transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-[#F06432] after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`
      }
    >
      Products
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/categories"
      className={({ isActive }) =>
        `relative inline-block font-inter text-[#191919] no-underline transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-[#F06432] after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`
      }
    >
      Categories
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/deals"
      className={({ isActive }) =>
        `relative inline-block font-inter text-[#191919] no-underline transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-[#F06432] after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`
      }
    >
      Deals
    </NavLink>
  </li>

</ul>
       <div className="flex items-center gap-5 justify-self-end">

  <div className="flex items-center gap-3 w-55.5 border-b border-[#191919] pb-2 focus-within:border-[#191919] transition-colors duration-300 mr-26">
    <img src={search} alt="" className="w-4 h-4 shrink-0 object-contain" />
    <input
      type="text"
      placeholder="Search the edit"
      className="font-inter flex-1 min-w-0 bg-transparent text-[15px] text-[#191919] placeholder:text-[#8A8780] outline-none"
    />
  </div>

  <Link
    to="/cart"
    aria-label="Shopping cart"
    className="relative flex items-center justify-center no-underline hover:opacity-60 transition-opacity duration-300"
  >
    <img src={cart} alt="cart" className="w-6 h-6 object-contain" />
    <span className="absolute -top-3 -right-3 bg-[#F06432] text-white text-[11px] font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
      1
    </span>
  </Link>

</div>
      </nav>
    </>
  )
}