import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartItemCount,
  selectCartSubtotal,
} from '../store/cartSlice'
import { useDispatch } from 'react-redux'

const formatPrice = (price) => `$${Number(price).toFixed(2)}`

export default function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartItemCount)
  const subtotal = useSelector(selectCartSubtotal)

  return (
    <div className="bg-ivory text-ink min-h-[calc(100vh-116px)] px-5 sm:px-10 lg:px-[5%] py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-14 sm:mb-16 lg:mb-20">
          <h1 className="font-heading text-[clamp(4.25rem,10vw,7.5rem)] font-bold leading-[0.86] tracking-[-0.075em]">
            SHOPPING CART
          </h1>
          <p className="text-sm text-muted mt-7">
            {itemCount} {itemCount === 1 ? 'carefully chosen item.' : 'carefully chosen items.'}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="pt-12 pb-20 text-center">
            <p className="label-editorial text-signal mb-4">Your selection</p>
            <h2 className="font-heading text-8xl sm:text-5xl font-bold mb-5 uppercase">Your cart is ready for ideas.</h2>
            <p className="text-muted max-w-md mx-auto mb-8">Add something useful to your edit and it will appear here.</p>
            <Link to="/products" className="btn-primary inline-flex no-underline">Explore Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-12 lg:gap-16 items-start">
            <section>
              <div className="border-t border-ink">
                {items.map((item, index) => (
                  <article key={item.id} className="grid grid-cols-[28px_124px_minmax(0,1fr)] sm:grid-cols-[32px_124px_minmax(0,1fr)_180px] gap-4 sm:gap-6 items-center border-b border-[#e7e2d9] py-6 sm:py-6">
                    <span className="text-[10px] font-bold text-signal self-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="w-[124px] h-[116px] bg-[#ece9e1] overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="min-w-0 self-center">
                      <p className="label-editorial text-ink mb-2">{item.brand || 'TechValut'}</p>
                      <h2 className="font-heading text-lg sm:text-xl font-medium leading-tight mb-2">{item.title}</h2>
                      <p className="text-xs text-muted mb-4">{formatPrice(item.price)}</p>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-xs text-muted underline underline-offset-4 hover:text-ink transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="col-start-3 sm:col-start-4 col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-end gap-5 self-center">
                      <div className="flex items-center border border-[#e7e2d9] h-11">
                        <button
                          type="button"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="w-10 h-full text-lg text-muted hover:text-ink transition-colors"
                          aria-label={`Decrease ${item.title} quantity`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="w-10 h-full text-lg text-muted hover:text-ink transition-colors"
                          aria-label={`Increase ${item.title} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <strong className="font-heading text-base whitespace-nowrap">{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </article>
                ))}
              </div>

              <Link to="/products" className="inline-block mt-8 text-sm font-semibold border-b border-ink pb-1 no-underline text-ink hover:text-signal hover:border-signal transition-colors">
                ← Continue shopping
              </Link>
            </section>

            <aside className="bg-white border-t-2 border-signal p-8 sm:p-9 lg:sticky lg:top-28">
              <p className="label-editorial text-ink mb-10">Order summary</p>

              <div className="space-y-7 text-xs">
                <div className="flex justify-between gap-6">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="flex justify-between gap-6">
                  <span>Shipping estimate</span>
                  <strong>Free</strong>
                </div>
              </div>

              <div className="mt-9">
                <label htmlFor="discount-code" className="block text-xs mb-3">Discount code</label>
                <div className="flex border border-[#e7e2d9] h-11">
                  <input id="discount-code" type="text" placeholder="Enter code" className="min-w-0 flex-1 px-3 text-xs outline-none placeholder:text-[#9b9891]" />
                  <button type="button" className="px-4 border-l border-[#e7e2d9] text-xs font-semibold hover:bg-ivory transition-colors">Apply</button>
                </div>
              </div>

              <div className="border-t border-ink mt-5 pt-6 flex justify-between items-center">
                <span className="text-xs">Estimated total</span>
                <strong className="font-heading text-2xl">{formatPrice(subtotal)}</strong>
              </div>

              <p className="text-[10px] text-muted leading-5 mt-6">Taxes calculated at checkout. This is a simulated purchase.</p>
              <Link to="/checkout" className="flex items-center justify-center w-full h-12 mt-5 bg-signal text-white text-sm font-semibold hover:bg-ink transition-colors no-underline">
                Proceed to checkout <span className="ml-2 text-lg align-[-1px]">→</span>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}