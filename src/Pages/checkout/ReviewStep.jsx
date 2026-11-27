import { formatPrice } from './CheckoutPage'

export default function ReviewStep({ shipping, delivery, payment, items, onEdit, onBack, onPlace }) {
  return (
    <div>
      <p className="label-editorial text-signal mb-3">Step 03</p>
      <h1 className="font-heading text-[clamp(3rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.06em] uppercase mb-10">
        One last look.
      </h1>

      <div className="border-t border-ink py-5">
        <div className="flex justify-between text-xs text-muted mb-3">
          <span>Shipping to</span>
          <button type="button" onClick={() => onEdit(1)} className="underline underline-offset-4 hover:text-ink">Edit</button>
        </div>
        <p className="text-sm font-semibold">{shipping.fullName}</p>
        <p className="text-xs text-muted leading-5 mt-1">
          {shipping.address}<br />
          {shipping.city}, {shipping.postalCode}<br />
          {shipping.country}
        </p>
      </div>

      <div className="border-t border-warmgray py-5">
        <div className="flex justify-between text-xs text-muted mb-3">
          <span>Delivery &amp; payment</span>
          <button type="button" onClick={() => onEdit(2)} className="underline underline-offset-4 hover:text-ink">Edit</button>
        </div>
        <p className="text-sm font-semibold">
          {delivery === 'express' ? 'Express delivery' : 'Standard delivery'} · {payment === 'card' ? 'Demo card' : 'Pay on delivery'}
        </p>
        <p className="text-xs text-muted mt-1">
          Estimated arrival in {delivery === 'express' ? '1-2' : '3-5'} business days.
        </p>
      </div>

      <div className="mt-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-warmgray">
            <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover bg-[#ece9e1]" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{item.title}</p>
              <p className="text-[11px] text-muted">Qty {item.quantity}</p>
            </div>
            <strong className="text-sm">{formatPrice(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button type="button" onClick={onBack} className="h-12 px-6 border border-warmgray bg-white text-sm font-semibold hover:border-ink transition-colors">Back</button>
        <button type="button" onClick={onPlace} className="h-12 px-8 bg-signal text-white text-sm font-semibold hover:bg-ink transition-colors">
          Place simulated order <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}