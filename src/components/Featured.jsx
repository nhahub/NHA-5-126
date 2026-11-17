import { Link } from 'react-router-dom'

const formatPrice = (price) => `$${Number(price).toFixed(2)}`

const getOriginalPrice = (product) => {
  const discount = Number(product.discountPercentage)
  if (!discount || discount <= 0 || discount >= 100) return null
  return formatPrice(product.price / (1 - discount / 100))
}

export default function Featured({ products, title, desc, loading, error }) {
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
        {loading && (
          <div className="col-span-full p-16 text-center text-[#706F69]">
            Loading the latest products...
          </div>
        )}

        {!loading && error && (
          <div className="col-span-full p-16 text-center text-[#B42318]">
            We couldn&apos;t load the latest products. {error}
          </div>
        )}

        {!loading && !error && products.map((product, index) => {
          const originalPrice = getOriginalPrice(product)
          const reviewCount = product.reviews?.length || 0
          const label = product.discountPercentage
            ? `SAVE ${Math.round(product.discountPercentage)}%`
            : product.tags?.[0]?.replaceAll('-', ' ') || 'FEATURED'

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white relative min-w-0 border-r border-b border-[#E7E2D9] group flex flex-col no-underline"
            >
              <figure className="relative overflow-hidden aspect-4/5 m-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />

                <span className="absolute top-5 left-5 text-[13px] font-bold tracking-wider text-[#d66b45]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="absolute bottom-5 left-5 bg-[#191919] text-white text-[8px] font-medium tracking-[0.15em] px-3 py-2 uppercase">
                  {label}
                </span>
              </figure>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#191919] mb-1">
                  {product.brand || product.category}
                </p>

                <h3 className="text-base font-medium leading-7 text-[#191919]">
                  {product.title}
                </h3>

                <p className="text-sm text-[#706F69] mt-3 flex items-center gap-1">
                  <span className="text-[#d66b45]">★</span>
                  <span className="font-semibold text-[#191919]">{product.rating}</span>
                  <span>({reviewCount})</span>
                </p>

                <div className="flex justify-between items-center mt-14 gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-lg font-semibold text-[#191919]">
                      {formatPrice(product.price)}
                    </span>

                    {originalPrice && (
                      <span className="text-base text-[#9B9891] line-through">
                        {originalPrice}
                      </span>
                    )}
                  </div>

                  <span
                    aria-hidden="true"
                    className="relative z-10 w-9.5 h-12 shrink-0 bg-[#191919] text-white text-2xl flex items-center justify-center group-hover:bg-[#F06432] transition-colors duration-300"
                  >
                    +
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
