import React from 'react'
import { Link } from 'react-router-dom'
export default function Featured({ products, title, desc })  {
  return (
    <section className="bg-white text-[#191919] px-5 sm:px-10 lg:px-[5%] py-16 lg:py-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#F06432] mb-3">
            THE SHORTLIST
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.04em] leading-none">
  {title}
</h2>
        </div>

        <p className="text-xs sm:text-sm text-[#706F69] max-w-sm leading-6">
          {desc}
        </p>
      </div>

      <div className="font-heading grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E7E2D9]">
        {products.map((product) => (
          <div key={product.id} className="bg-white relative min-w-0 border-r border-b border-[#E7E2D9] group flex flex-col">

            {/* IMAGE */}
            <figure className="relative overflow-hidden aspect-4/5 m-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />

              <span className="absolute top-5 left-5 text-[13px] font-bold tracking-wider text-[#d66b45]">
                0{product.id}
              </span>

              <span className=" absolute bottom-5 left-5 bg-[#191919] text-white text-[8px] font-medium tracking-[0.15em] px-3 py-2 uppercase ">
                {product.label}
              </span>
            </figure>

            {/* BODY */}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#191919] mb-1">
                {product.brand}
              </p>

              <h3 className="text-base font-medium leading-7">
  <Link
    to={`/products/${product.id}`}
    className="text-[#191919] no-underline group-hover: transition-colors duration-300 after:content-[''] after:absolute after:inset-0"
  >
    {product.name}
  </Link>
</h3>

              <p className="text-sm text-[#706F69] mt-3 flex items-center gap-1">
                <span className="text-[#d66b45]">★</span>
                <span className="font-semibold text-[#191919]">{product.rating}</span>
                <span>({product.reviews})</span>
              </p>

              
              <div className="flex justify-between items-center mt-14 gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-lg font-semibold text-[#191919]">
                    {product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-base text-[#9B9891] line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <button
              type="button"
                 aria-label={`Add ${product.name} to cart`}
  className="relative z-10 w-9.5 h-12 shrink-0 bg-[#191919] text-white text-2xl flex items-center justify-center hover:bg-[#F06432] transition-colors duration-300"
>
                  +
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}