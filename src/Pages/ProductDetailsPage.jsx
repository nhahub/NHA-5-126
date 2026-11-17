import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { productService } from '../Helpers/productService'
import { addToCart } from '../store/cartSlice'

const formatPrice = (price) => `$${Number(price).toFixed(2)}`

const getOriginalPrice = (product) => {
  const discount = Number(product.discountPercentage)
  if (!discount || discount <= 0 || discount >= 100) return null
  return formatPrice(product.price / (1 - discount / 100))
}

const formatLabel = (value) => value?.replaceAll('-', ' ')

export default function ProductDetailsPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        setAdded(false)

        const selectedProduct = await productService.getProductById(id, controller.signal)

        if (!selectedProduct) {
          setError('This product is not available in the TechValut edit.')
          return
        }

        setProduct(selectedProduct)
        setActiveImage(selectedProduct.images?.[0] || selectedProduct.thumbnail)

        try {
          const products = await productService.getAllProducts(controller.signal)
          setRelatedProducts(
            products.filter((item) => item.id !== selectedProduct.id).slice(0, 4),
          )
        } catch {
          if (!controller.signal.aborted) setRelatedProducts([])
        }
      } catch (requestError) {
        if (controller.signal.aborted) return
        setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [id])

  const imageOptions = useMemo(() => {
    if (!product) return []
    return product.images?.length ? product.images : [product.thumbnail]
  }, [product])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-ivory px-6">
        <p className="font-heading text-2xl text-signal">Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-ivory px-6 text-center">
        <p className="label-editorial text-signal">Product unavailable</p>
        <h1 className="font-heading text-4xl font-bold">We couldn&apos;t find that product.</h1>
        <p className="max-w-md text-muted">{error || 'Try choosing another product from the catalog.'}</p>
        <Link to="/products" className="btn-primary no-underline">Back to products</Link>
      </div>
    )
  }

  const originalPrice = getOriginalPrice(product)
  const reviewCount = product.reviews?.length || 0
  const categoryLabel = formatLabel(product.category)

  return (
    <div className="bg-ivory text-ink">
      <section className="px-5 sm:px-10 lg:px-[5%] pt-8 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex flex-wrap items-center gap-3 text-[11px] text-muted mb-12" aria-label="Breadcrumb">
            <Link to="/" className="text-muted no-underline hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="text-muted no-underline hover:text-ink transition-colors">Products</Link>
            <span>/</span>
            <span className="text-ink">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <div className="relative aspect-[1.18] min-h-[340px] bg-[#111719] overflow-hidden">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-5 left-5 bg-[#191919] text-white text-[9px] font-bold tracking-[0.16em] px-3 py-2 uppercase">
                  {product.discountPercentage ? `SAVE ${Math.round(product.discountPercentage)}%` : 'FEATURED'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-3">
                {imageOptions.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`aspect-square overflow-hidden border-2 bg-[#ece9e1] ${activeImage === image ? 'border-signal' : 'border-transparent'}`}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 lg:pt-8">
              <p className="label-editorial text-signal mb-8">
                {product.brand || 'TechValut'} / {categoryLabel}
              </p>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[0.92] tracking-[-0.055em] max-w-xl mb-8">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 text-sm mb-5">
                <span className="text-signal text-lg">★</span>
                <strong>{product.rating}</strong>
                <span className="text-muted">({reviewCount} reviews)</span>
              </div>

              <p className="flex items-center gap-2 text-sm text-[#2d8050] mb-10">
                <span className="w-2 h-2 rounded-full bg-[#2d8050]" />
                {product.stock > 0 ? 'In stock and ready to ship' : 'Currently out of stock'}
              </p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading text-4xl font-bold">{formatPrice(product.price)}</span>
                {originalPrice && <span className="text-sm text-muted line-through">{originalPrice}</span>}
              </div>

              <p className="text-sm text-muted leading-7 max-w-xl mb-9">
                {product.description}
              </p>

              <div className="border-t border-[#d9d4ca] pt-5 mb-8">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-semibold">Category</span>
                  <span className="text-muted capitalize">{categoryLabel}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <div className="flex items-center justify-between border border-[#d9d4ca] h-14 px-4 sm:w-28">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl text-muted hover:text-ink" aria-label="Decrease quantity">−</button>
                  <span className="text-sm">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="text-xl text-muted hover:text-ink" aria-label="Increase quantity">+</button>
                </div>
                <button
                  type="button"
                  disabled={product.stock <= 0}
                  onClick={() => {
                    dispatch(addToCart({ ...product, quantity }))
                    setAdded(true)
                  }}
                  className="h-14 flex-1 bg-signal text-white text-sm font-semibold hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {added ? 'Added to cart' : `Add to cart · ${formatPrice(product.price * quantity)}`}
                </button>
              </div>

              <button type="button" className="w-full h-14 border border-ink text-sm font-semibold hover:bg-ink hover:text-white transition-colors">
                Buy now
              </button>

              <div className="grid grid-cols-2 border-t border-b border-[#d9d4ca] mt-8">
                <div className="py-5 pr-4 border-r border-[#d9d4ca]">
                  <strong className="block text-xs mb-2">Free delivery</strong>
                  <span className="text-xs text-muted">Arrives in 3–5 business days</span>
                </div>
                <div className="py-5 pl-4">
                  <strong className="block text-xs mb-2">Easy returns</strong>
                  <span className="text-xs text-muted">30 days to make up your mind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 sm:px-10 lg:px-[5%] py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap gap-8 sm:gap-12 border-b border-[#e7e2d9] mb-20">
            <a href="#overview" className="border-b-2 border-signal pb-6 text-xs font-semibold no-underline text-ink">Overview</a>
            <a href="#specifications" className="pb-6 text-xs font-semibold text-muted no-underline hover:text-ink transition-colors">Technical specifications</a>
            <a href="#reviews" className="pb-6 text-xs font-semibold text-muted no-underline hover:text-ink transition-colors">Customer reviews</a>
          </div>

          <div id="overview" className="max-w-4xl pb-20">
            <p className="label-editorial text-signal mb-5">Designed for the everyday</p>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[88px] leading-[0.94] tracking-[-0.06em] mb-10">
              DETAILS THAT
              <br />
              MAKE A DIFFERENCE.
            </h2>
            <p className="text-base sm:text-lg text-muted leading-8 max-w-2xl">
              {product.description} Selected for the balance it strikes between thoughtful design, dependable performance, and long-term value.
            </p>
          </div>

          <div id="specifications" className="border-t border-[#e7e2d9] py-16">
            <p className="label-editorial text-signal mb-5">The details</p>
            <h2 className="font-heading text-4xl sm:text-5xl mb-10">Technical specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#e7e2d9]">
              {[
                ['Brand', product.brand || 'TechValut'],
                ['Category', categoryLabel],
                ['Weight', product.weight ? `${product.weight} g` : 'Not listed'],
                ['Warranty', product.warrantyInformation || 'Not listed'],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-b border-[#e7e2d9] p-5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-3">{label}</p>
                  <p className="text-sm font-semibold capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="reviews" className="border-t border-[#e7e2d9] py-16">
            <p className="label-editorial text-signal mb-5">What people think</p>
            <h2 className="font-heading text-4xl sm:text-5xl mb-10">Customer reviews</h2>
            {product.reviews?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.reviews.slice(0, 3).map((review) => (
                  <article key={`${review.reviewerName}-${review.comment}`} className="border border-[#e7e2d9] p-6">
                    <p className="text-signal mb-4">{'★'.repeat(Math.round(review.rating))}</p>
                    <p className="text-sm leading-6 mb-6">{review.comment}</p>
                    <p className="text-xs font-semibold">{review.reviewerName}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-muted">Reviews for this product are coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-ivory px-5 sm:px-10 lg:px-[5%] py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto">
            <p className="label-editorial text-signal mb-4">Keep exploring</p>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-[-0.06em] mb-12">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#e7e2d9]">
              {relatedProducts.map((item, index) => (
                <Link key={item.id} to={`/products/${item.id}`} className="group bg-white border-r border-b border-[#e7e2d9] no-underline text-ink">
                  <div className="relative aspect-square overflow-hidden bg-[#ece9e1]">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-bold text-signal">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">{item.brand || item.category}</p>
                    <h3 className="font-heading text-lg mb-6">{item.title}</h3>
                    <p className="font-heading font-semibold">{formatPrice(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
