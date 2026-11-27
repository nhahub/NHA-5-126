import { Link } from 'react-router-dom'
import { formatPrice } from './CheckoutPage'

export default function ConfirmationStep({ order }) {
  return (
    <div className="bg-ivory text-ink min-h-[calc(100vh-116px)] px-5 sm:px-10 lg:px-[5%] py-14 sm:py-20">
      <div className="max-w-[820px] mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-[#238a52] text-white text-2xl flex items-center justify-center mx-auto mb-8">✓</div>
        <p className="label-editorial text-signal mb-5">Order confirmed / Simulation</p>
        <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.06em] uppercase mb-6">
          Your next favorite thing is on its way.
        </h1>
        <p className="text-sm text-muted max-w-md mx-auto mb-12">
          Thanks for shopping the TechValut edit. We&apos;ve received your simulated order and prepared the details below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-ink text-center">
          <div className="py-5 border-b sm:border-b-0 sm:border-r border-warmgray">
            <p className="label-editorial mb-2">Order reference</p>
            <p className="text-xs font-bold">{order.reference}</p>
          </div>
          <div className="py-5 border-b sm:border-b-0 sm:border-r border-warmgray">
            <p className="label-editorial mb-2">Order date</p>
            <p className="text-xs font-bold">{order.date}</p>
          </div>
          <div className="py-5">
            <p className="label-editorial mb-2">Estimated delivery</p>
            <p className="text-xs font-bold">{order.delivery === 'express' ? '1-2' : '3-5'} business days</p>
          </div>
        </div>

        <div className="bg-white mt-8 p-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_240px] gap-6 text-left items-center">
          <div>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-2">
                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover bg-[#ece9e1]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{item.title}</p>
                  <p className="text-[10px] text-muted">Qty {item.quantity}</p>
                </div>
                <span className="text-xs font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="hidden sm:block w-px self-stretch bg-warmgray" />
          <div className="text-xs space-y-3">
            <div className="flex justify-between gap-4">
              <span className="text-muted">Shipping destination</span>
              <strong className="text-right">{order.city}, {order.postalCode}</strong>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted">Total</span>
              <strong className="font-heading text-xl">{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>

        <Link to="/products" className="inline-block mt-10 h-12 leading-[48px] px-8 bg-signal text-white text-sm font-semibold no-underline hover:bg-ink transition-colors">
          Continue shopping <span className="ml-2">→</span>
        </Link>
        <p className="text-[10px] text-muted mt-5">This is a portfolio prototype. No real transaction has taken place.</p>
      </div>
    </div>
  )
}