import { formatPrice } from './CheckoutPage'

export default function OrderSummary({ subtotal, shippingCost, total }) {
  return (
    <aside className="bg-white border-t-2 border-signal p-8 sm:p-9 lg:sticky lg:top-28">
      <p className="label-editorial text-ink mb-10">Order summary</p>

      <div className="space-y-7 text-xs">
        <div className="flex justify-between gap-6">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className="flex justify-between gap-6">
          <span>Shipping estimate</span>
          <strong>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</strong>
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
        <strong className="font-heading text-2xl">{formatPrice(total)}</strong>
      </div>

      <p className="text-[10px] text-muted leading-5 mt-6">Taxes calculated at checkout. This is a simulated purchase.</p>
    </aside>
  )
}