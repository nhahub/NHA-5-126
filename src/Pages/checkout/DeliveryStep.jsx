import { formatPrice } from './CheckoutPage'

function Option({ name, value, checked, onChange, title, text, right }) {
  return (
    <label className="flex items-center gap-4 py-5 border-b border-warmgray cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="accent-[#F06432]" />
      <span className="flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted mt-1">{text}</span>
      </span>
      {right && <span className="text-sm font-semibold">{right}</span>}
    </label>
  )
}

export default function DeliveryStep({ delivery, setDelivery, payment, setPayment, onBack, onNext }) {
  return (
    <div>
      <p className="label-editorial text-signal mb-3">Step 02</p>
      <h1 className="font-heading text-[clamp(3rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.06em] uppercase mb-10">
        How should it arrive?
      </h1>

      <div className="border-t border-ink">
        <Option name="delivery" value="standard" checked={delivery === 'standard'} onChange={setDelivery} title="Standard delivery" text="3-5 business days" right="Free" />
        <Option name="delivery" value="express" checked={delivery === 'express'} onChange={setDelivery} title="Express delivery" text="1-2 business days" right={formatPrice(18)} />
      </div>

      <h2 className="font-heading text-2xl font-medium mt-12 pb-3 border-b border-ink">Simulated payment</h2>
      <div>
        <Option name="payment" value="card" checked={payment === 'card'} onChange={setPayment} title="Demo card" text="No real payment credentials required" />
        <Option name="payment" value="cod" checked={payment === 'cod'} onChange={setPayment} title="Pay on delivery" text="For prototype demonstration only" />
      </div>

      <div className="mt-6 bg-[#e3efe8] text-xs text-[#2f6b4a] px-4 py-4">
        ✓ &nbsp;This checkout is a simulation. No payment will be processed.
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button type="button" onClick={onBack} className="h-12 px-6 border border-warmgray bg-white text-sm font-semibold hover:border-ink transition-colors">Back</button>
        <button type="button" onClick={onNext} className="h-12 px-8 bg-signal text-white text-sm font-semibold hover:bg-ink transition-colors">
          Continue <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}