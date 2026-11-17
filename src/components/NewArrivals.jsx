import React from 'react'
import { Link } from 'react-router-dom'
import bose from '../assets/images/bose.png'
import fujifilm from '../assets/images/fujifilm.png'
import samsung from '../assets/images/samsung.png'
import arrow from '../assets/icons/pointer.png'

const arrivals = [
  { id: 1, brand: 'BOSE', name: 'QuietComfort Ultra', price: '$429', image: bose, alt: 'Bose QuietComfort Ultra' },
  { id: 2, brand: 'FUJIFILM', name: 'Instax Mini 12', price: '$89', image: fujifilm, alt: 'Fujifilm Instax Mini 12' },
  { id: 3, brand: 'SAMSUNG', name: 'Galaxy Buds2 Pro', price: '$159', image: samsung, alt: 'Samsung Galaxy Buds2 Pro' },
]

export default function NewArrivals() {
  return (
    <section className="bg-[#F6F3EC] text-[#191919] px-5 sm:px-8 lg:px-[5%] py-16 lg:py-32 grid grid-cols-1 lg:grid-cols-[342px_1fr] gap-10 lg:gap-16 items-start">

      {/* LEFT */}
      <div>
        <p className="text-[10px]  font-inter font-bold tracking-[0.18em] text-[#F06432] mb-3.5">
          RECENTLY LANDED
        </p>

        <h2 className="font-heading text-8xl lg:text-[56px] font-bold tracking-[-0.04em] leading-[1.04]">
  NEW
  <br />
  ARRIVALS
</h2>

        <p className="text-[13px] font-inter leading-5.5 text-[#706F69] max-w-65 mt-1 mb-2">
          Fresh tools and smart upgrades, without the endless scroll.
        </p>

        <Link
          to="/products"
          className="group inline-flex items-center gap-3 border-b border-[#191919] pb-2 text-[10x] font-inter font-semibold text-[#191919] no-underline hover: hover:transition duration-300 "
        >
          See what's new
          <img
  src={arrow}
  alt=""
  className="w-4 h-4 object-contain transition-transform duration-300 group-hover:translate-x-2"
/>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="border-t border-[#E7E2D9]">
        {arrivals.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="group grid grid-cols-[20px_72px_1fr_auto] lg:grid-cols-[24px_72px_1fr_auto] gap-x-5 ml-8 items-center py-[21px] border-b border-[#E7E2D9] text-[#191919] no-underline"
          >
            <span className=" font-inter text-[9px] text-[#F06432]">0{item.id}</span>

            <img
              src={item.image}
              alt={item.alt}
              className="w-[72px] h-[72px] object-contain mix-blend-multiply transition-transform duration-300 "
            />

            <div className="min-w-0 pl-2">
              <p className="text-[13.5px]  font-inter tracking-[0.15em] text-[#706F69] mb-1">
                {item.brand}
              </p>
              <h3 className="text-base font-heading font-medium leading-6 ">
                {item.name}
              </h3>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm font-medium font-heading ">{item.price}</span>
              <img
  src={arrow}
  alt=""
  className="w-4 h-4 object-contain transition-transform duration-300 group-hover:translate-x-1"
/>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}